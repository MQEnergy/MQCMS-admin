import store from '@/store';
import axios from 'axios';
import util from '@/libs/util';
import Setting from '@/setting';
import router from '@/router';

import { Message, Notice, Modal } from 'view-design';

// 创建一个错误
function errorCreate (msg) {
    const err = new Error(msg);
    errorLog(err);
    throw err;
}

// 记录和显示错误
function errorLog (err) {
    // 添加到日志
    store.dispatch('admin/log/push', {
        message: '数据请求异常',
        type: 'error',
        meta: {
            error: err
        }
    });
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.error('>>>>>> Error >>>>>>');
        console.log(err);
    }
    // 显示提示，可配置使用 iView 的 $Message 还是 $Notice 组件来显示
    if (Setting.errorModalType === 'Message') {
        Message.error({
            content: err.message,
            duration: Setting.modalDuration
        });
    } else if (Setting.errorModalType === 'Notice') {
        Notice.error({
            title: '提示',
            desc: err.message,
            duration: Setting.modalDuration
        });
    }
}

// 创建一个 axios 实例
const service = axios.create({
    baseURL: Setting.apiBaseURL,
    withCredentials: true,
    timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        const token = util.cookies.get('token');
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        // 发送失败
        console.log(error);
        Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data;
        // 这个状态码是和后端约定的
        const { code } = dataAxios;
        // 根据 code 进行判断
        if (code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口
            return dataAxios;
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
            case 0:
                // [ 示例 ] code === 0 代表没有错误
                return dataAxios.data;
            case 'xxx':
                // [ 示例 ] 其它和后台约定的 code
                errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`);
                break;
            default:
                // 不是正确的 code
                errorCreate(`${dataAxios.msg}: ${response.config.url}`);
                break;
            }
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
            case 400: error.message = error.response.data.message; break;
            case 401: error.message = '未授权，请登录'; break;
            case 403: error.message = '拒绝访问'; break;
            case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
            case 408: error.message = '请求超时'; break;
            case 500: error.message = '服务器内部错误'; break;
            case 501: error.message = '服务未实现'; break;
            case 502: error.message = '网关错误'; break;
            case 503: error.message = '服务不可用'; break;
            case 504: error.message = '网关超时'; break;
            case 505: error.message = 'HTTP版本不受支持'; break;
            default: error.message = error.response.data.message; break;
            }
        }
        if (error.response.status === 401) {
            Modal.error({
                title: '提示',
                content: '登录状态已失效或您已在其他设备登录，请重新登录',
                onOk: () => {
                    // 删除cookie
                    util.cookies.remove('token');
                    util.cookies.remove('uuid');

                    // 清空 vuex 用户信息
                    store.dispatch('admin/user/set', {}, { root: true });

                    // 跳转路由
                    router.push({
                        name: 'login'
                    });
                }
            })
        } else {
            errorLog(error);
        }
        return Promise.reject(error);
    }
);

export default service;
