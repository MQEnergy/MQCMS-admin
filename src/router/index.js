import Vue from 'vue';
import VueRouter from 'vue-router';
import ViewUI from 'view-design';
import util from '@/libs/util'
import Setting from '@/setting';
import store from '@/store/index';
import routes from './routes';
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: Setting.routerMode
});

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
    if (Setting.showProgressBar) ViewUI.LoadingBar.start();
    if (to.matched.some(_ => _.meta.auth)) {
        const token = util.cookies.get('token');

        if (token && token !== 'undefined') {
            next();
        } else {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});

router.afterEach(to => {
    if (Setting.showProgressBar) ViewUI.LoadingBar.finish();
    store.dispatch('admin/page/open', to);
    util.title({
        title: to.meta.title
    });
    window.scrollTo(0, 0);
});

export default router;
