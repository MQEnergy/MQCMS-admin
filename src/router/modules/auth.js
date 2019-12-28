import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'auth-';

export default {
    path: '/auth',
    name: 'auth',
    redirect: {
        name: `${pre}index`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'index',
            name: `${pre}index`,
            meta: {
                ...meta,
                title: '管理员列表'
            },
            component: () => import('@/pages/auth/index/index')
        },
        {
            path: 'detail',
            name: `${pre}detail`,
            meta: {
                ...meta,
                title: '管理员详情'
            },
            component: () => import('@/pages/auth/index/detail')
        },
        {
            path: 'menu',
            name: `${pre}menu`,
            meta: {
                ...meta,
                title: '菜单列表'
            },
            component: () => import('@/pages/auth/menu/index')
        },
        {
            path: 'role',
            name: `${pre}role`,
            meta: {
                ...meta,
                title: '角色列表'
            },
            component: () => import('@/pages/auth/role/index')
        }
    ]
};
