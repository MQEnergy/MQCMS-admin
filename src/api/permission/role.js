import request from '@/plugins/request'

// 管理员列表
export function RoleIndex(params) {
    return request({
        url: '/role/index',
        method: 'get',
        params
    })
}

// 管理员列表
export function RoleSearch(data) {
    return request({
        url: '/role/index',
        method: 'post',
        data
    })
}

// 管理员详情
export function RoleView(params) {
    return request({
        url: '/role/show',
        method: 'get',
        params
    })
}

// 管理员更新
export function RoleUpdate(data) {
    return request({
        url: '/role/update',
        method: 'post',
        data
    })
}

// 管理员更新权限
export function RoleUpdatePermission(data) {
    return request({
        url: '/role/update-permission',
        method: 'post',
        data
    })
}

// 管理员创建
export function RoleCreate(data) {
    return request({
        url: '/role/store',
        method: 'post',
        data
    })
}

// 管理员删除
export function RoleDelete(data) {
    return request({
        url: '/role/delete',
        method: 'post',
        data
    })
}
