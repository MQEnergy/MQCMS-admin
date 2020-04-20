import BasicLayout from '@/layouts/basic-layout'

const meta = {
    auth: true
};

const pre = 'permission-';

export default {
    path: '/permission',
    name: 'permission',
    redirect: {
        name: `${pre}admin`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'admin',
            name: `${pre}admin`,
            meta: {
                ...meta,
                title: '管理员管理',
                closable: false
            },
            component: () => import('@/pages/permission/admin/index')
        },
        {
            path: 'role',
            name: `${pre}role`,
            meta: {
                ...meta,
                title: '角色管理',
                closable: false
            },
            component: () => import('@/pages/permission/role/index')
        },
        {
            path: 'menu',
            name: `${pre}menu`,
            meta: {
                ...meta,
                title: '菜单管理',
                closable: false
            },
            component: () => import('@/pages/permission/menu/index')
        }
    ]
}
