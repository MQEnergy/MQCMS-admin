const pre = '/attachment/';

export default {
    path: '/attachment',
    title: '附件管理',
    header: 'system-index',
    icon: 'md-photos',
    custom: 'i-icon-demo i-icon-demo-list',
    children: [
        {
            path: `${pre}index`,
            title: '附件列表'
        }
    ]
}
