const pre = '/dashboard/';

export default {
    path: '/dashboard',
    title: '统计分析',
    header: 'home', // 跟header里面参数name相对应
    icon: 'md-speedometer',
    children: [
        {
            path: `${pre}console`,
            title: '主控台'
        }
    ]
}
