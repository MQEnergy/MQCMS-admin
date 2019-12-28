import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

// const pre = 'system-';

export default {
    path: '/system',
    name: 'system',
    redirect: {
        name: `auth-index`
    },
    meta,
    component: BasicLayout
};
