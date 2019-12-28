/**
 * 注册、登录、注销
 */
import util from '@/libs/util';
import router from '@/router';
import { AccountLogin, AccountRegister, AccountLogout } from '@api/account';
import { Modal } from 'view-design';

export default {
    namespaced: true,
    actions: {
        /**
         * @description 登录
         * @param {Object} param context
         * @param {Object} param account {String} 用户账号
         * @param {Object} param password {String} 密码
         * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
         */
        login ({ dispatch }, {
            account = '',
            password = ''
        } = {}) {
            return new Promise((resolve, reject) => {
                // 开始请求登录接口
                AccountLogin({
                    account,
                    password
                })
                    .then(async res => {
                        util.cookies.set('uuid', res.uuid);
                        util.cookies.set('token', res.token);
                        // 设置 vuex 用户信息
                        await dispatch('admin/user/set', res.info, { root: true });
                        // 用户登录后从持久化数据加载一系列的设置
                        await dispatch('load');
                        // 结束
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        /**
         * @description 退出登录
         * */
        logout ({ commit, dispatch }, { confirm = false, vm } = {}) {
            async function logout () {
                AccountLogout().then(async res => {
                    util.cookies.remove('token');
                    util.cookies.remove('uuid');
                    await dispatch('admin/user/set', {}, { root: true });
                    router.push({
                        name: 'login'
                    });
                })
            }

            if (confirm) {
                Modal.confirm({
                    title: vm.$t('basicLayout.logout.confirmTitle'),
                    content: vm.$t('basicLayout.logout.confirmContent'),
                    onOk: () => {
                        logout();
                    }
                });
            } else {
                logout();
            }
        },
        /**
         * @description 注册
         * @param {Object} param context
         * @param {Object} param email {String} 邮箱
         * @param {Object} param password {String} 密码
         * @param {Object} param phone {String} 手机号码
         * @param {Object} param captcha {String} 验证码
         */
        register ({ dispatch }, {
            email = '',
            account = '',
            password = '',
            phone = '',
            captcha = ''
        } = {}) {
            return new Promise((resolve, reject) => {
                AccountRegister({
                    email,
                    account,
                    password,
                    phone,
                    captcha
                })
                    .then(async res => {
                        util.cookies.set('uuid', res.uuid);
                        util.cookies.set('token', res.token);
                        await dispatch('admin/user/set', res.info, { root: true });
                        await dispatch('load');
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        },
        /**
         * @description 用户登录后从持久化数据加载一系列的设置
         * @param {Object} state vuex state
         * @param {Object} dispatch vuex dispatch
         */
        load ({ state, dispatch }) {
            return new Promise(async resolve => {
                await dispatch('admin/user/load', null, { root: true });
                await dispatch('admin/page/openedLoad', null, { root: true });
                resolve();
            })
        }
    }
};
