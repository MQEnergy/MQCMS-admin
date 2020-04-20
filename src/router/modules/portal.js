import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'portal-';

export default {
    path: '/portal',
    name: 'portal',
    redirect: {
        name: `${pre}post`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'post',
            name: `${pre}post`,
            meta: {
                ...meta,
                title: '文章管理'
            },
            component: () => import('@/pages/portal/post/index')
        },
        {
            path: 'post/create',
            name: `${pre}post-create`,
            meta: {
                ...meta,
                title: '添加文章'
            },
            component: () => import('@/pages/portal/post/create')
        },
        {
            path: 'category',
            name: `${pre}category`,
            meta: {
                ...meta,
                title: '分类管理'
            },
            component: () => import('@/pages/portal/category/index')
        },
        {
            path: 'tag',
            name: `${pre}tag`,
            meta: {
                ...meta,
                title: '标签管理'
            },
            component: () => import('@/pages/portal/tag/index')
        },
        {
            path: 'comment',
            name: `${pre}comment`,
            meta: {
                ...meta,
                title: '评论管理'
            },
            component: () => import('@/pages/portal/comment/index')
        }
    ]
};
