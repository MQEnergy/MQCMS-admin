import request from '@/plugins/request'

// 菜单列表
export function MenuIndex(params) {
    return request({
        url: '/menu/index',
        method: 'get',
        params
    })
}

// 管理员详情
export function MenuShow(params) {
    return request({
        url: '/menu/show',
        method: 'get',
        params
    })
}

// 管理员更新
export function MenuUpdate(data) {
    return request({
        url: '/menu/update',
        method: 'post',
        data
    })
}

// 管理员创建
export function MenuStore(data) {
    return request({
        url: '/menu/store',
        method: 'post',
        data
    })
}

// 更新状态
export function MenuUpdateStatus(data) {
    return request({
        url: '/menu/update-status',
        method: 'post',
        data
    })
}

// 更新状态
export function MenuDelete(data) {
    return request({
        url: '/menu/delete',
        method: 'post',
        data
    })
}
