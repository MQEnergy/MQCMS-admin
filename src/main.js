import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ViewUI from 'view-design';
import Setting from './setting';
import mixinApp from '@/mixins/app';
import plugins from '@/plugins';
import router from './router';
import menuHeader from '@/menu/header';
import menuSider from '@/menu/sider';
import { frameInRoutes } from '@/router/routes';
import i18n from '@/i18n';
import 'view-design/dist/styles/iview.css';

// 方法
import { getHeaderName, getMenuSider, getSiderSubmenu } from '@/libs/system';

// 内置组件
import iLink from '@/components/link';
import PageHeader from '@/components/pageheader/index';

import './assets/styles/index.less';
import './assets/styles/default/mqcms.css';

if (window) window.$t = (key, value) => i18n.t(key, value);

Vue.use(plugins);
Vue.use(ViewUI, {
    i18n: (key, value) => i18n.t(key, value)
});

Vue.component('i-link', iLink);
Vue.component('page-header', PageHeader);

Vue.config.productionTip = false;

new Vue({
    mixins: [mixinApp],
    router,
    i18n,
    store,
    render: h => h(App),
    created () {
        // 处理路由 得到每一级的路由设置
        this.$store.commit('admin/page/init', frameInRoutes);
        // 设置顶栏菜单
        this.$store.commit('admin/menu/setHeader', menuHeader);
        // 加载用户登录的数据
        this.$store.dispatch('admin/account/load');
        // 初始化全屏监听
        this.$store.dispatch('admin/layout/listenFullscreen')
    },
    watch: {
        // 监听路由 控制侧边栏显示 标记当前顶栏菜单（如需要）
        '$route' (to, from) {
            const path = to.path;
            if (!Setting.dynamicSiderMenu) {
                const headerName = getHeaderName(path, menuSider);
                // 在 404 时，是没有 headerName 的
                if (headerName !== null) {
                    this.$store.commit('admin/menu/setHeaderName', headerName);

                    const filterMenuSider = getMenuSider(menuSider, headerName);
                    this.$store.commit('admin/menu/setSider', filterMenuSider);
                    this.$store.commit('admin/menu/setActivePath', path);

                    const openNames = getSiderSubmenu(path, menuSider);
                    this.$store.commit('admin/menu/setOpenNames', openNames);
                }
            }
            this.appRouteChange(to, from);
        }
    }
}).$mount('#app');
