import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'tag-';

export default {
    path: '/tag',
    name: 'tag',
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
                title: '标签列表'
            },
            component: () => import('@/pages/tag/index')
        }
    ]
};
