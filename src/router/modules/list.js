import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'list-';

export default {
    path: '/list',
    name: 'list',
    redirect: {
        name: `${pre}basic-list`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'basic-list',
            name: `${pre}basic-list`,
            meta: {
                ...meta,
                title: '基础列表'
            },
            component: () => import('@/pages/list/basic-list')
        },
        {
            path: 'card-list',
            name: `${pre}card-list`,
            meta: {
                ...meta,
                title: '卡片列表'
            },
            component: () => import('@/pages/list/card-list')
        },
        {
            path: 'user-list',
            name: `${pre}user-list`,
            meta: {
                ...meta,
                title: '用户列表'
            },
            component: () => import('@/pages/list/user-list')
        },
        {
            path: 'goods-list',
            name: `${pre}goods-list`,
            meta: {
                ...meta,
                title: '商品列表'
            },
            component: () => import('@/pages/list/goods-list')
        },
        {
            path: 'table-list',
            name: `${pre}table-list`,
            meta: {
                ...meta,
                title: '查询表格'
            },
            component: () => import('@/pages/list/table-list')
        }
    ]
};
