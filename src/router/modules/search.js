import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'search-';

export default {
    path: '/search',
    name: 'search',
    redirect: {
        name: `${pre}search-article`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'search-article',
            name: `${pre}search-article`,
            meta: {
                ...meta,
                title: '搜索列表（文章）'
            },
            component: () => import('@/pages/search/search-article')
        },
        {
            path: 'search-projects',
            name: `${pre}search-projects`,
            meta: {
                ...meta,
                title: '搜索列表（项目）'
            },
            component: () => import('@/pages/search/search-projects')
        },
        {
            path: 'search-apps',
            name: `${pre}search-apps`,
            meta: {
                ...meta,
                title: '搜索列表（应用）'
            },
            component: () => import('@/pages/search/search-apps')
        }
    ]
};
