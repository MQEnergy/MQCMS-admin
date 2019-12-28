/**
 * 插件
 * */

// 错误捕获
import pluginError from '@/plugins/error';
// 日志插件
import pluginLog from '@/plugins/log';
// 鉴权指令
import directiveAuth from '@/plugins/auth';
// color指令
import { colorInserted, resizeInserted, fontInserted, heightInserted } from '@/plugins/directive';

export default {
    async install (Vue, options) {
        // 插件
        Vue.use(pluginError);
        Vue.use(pluginLog);

        // 指令
        Vue.directive('auth', directiveAuth);
        Vue.directive('color', colorInserted);
        Vue.directive('resize', resizeInserted);
        Vue.directive('font', fontInserted);
        Vue.directive('height', heightInserted);
    }
}
