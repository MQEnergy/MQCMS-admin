import request from '@/plugins/request'

// 管理员列表
export function AdminIndex(params) {
    return request({
        url: '/admin/index',
        method: 'get',
        params
    })
}

// 管理员列表
export function AdminSearch(data) {
    return request({
        url: '/admin/index',
        method: 'post',
        data
    })
}

// 管理员详情
export function AdminView(params) {
    return request({
        url: '/admin/show',
        method: 'get',
        params
    })
}

// 管理员更新
export function AdminUpdate(data) {
    return request({
        url: '/admin/update',
        method: 'post',
        data
    })
}

// 管理员创建
export function AdminCreate(data) {
    return request({
        url: '/admin/store',
        method: 'post',
        data
    })
}

// 管理员删除
export function AdminDelete(data) {
    return request({
        url: '/admin/delete',
        method: 'post',
        data
    })
}

// 管理员module
export function AdminModule(data) {
    return request({
        url: '/admin/module',
        method: 'post',
        data
    })
}

// 获取管理员角色列表
export function AdminRoleList(params) {
    return request({
        url: '/admin/role-list',
        method: 'get',
        params
    })
}

// 分配角色
export function AdminDistributeRole(data) {
    return request({
        url: '/admin/distribute-role',
        method: 'post',
        data
    })
}

// 分配角色
export function AdminClearCache(data) {
    return request({
        url: '/admin/clear-cache',
        method: 'post',
        data
    })
}
