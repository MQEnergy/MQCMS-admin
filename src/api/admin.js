import request from '@/plugins/request';

export function AdminIndex (params) {
    return request({
        url: '/admin/index',
        method: 'get',
        params
    });
}

export function AdminSearch (data) {
    return request({
        url: '/admin/index',
        method: 'post',
        data
    });
}

export function AdminShow (params) {
    return request({
        url: '/admin/show',
        method: 'get',
        params
    });
}

export function AdminStore (data) {
    return request({
        url: '/admin/store',
        method: 'post',
        data
    });
}

export function AdminUpdate (data) {
    return request({
        url: '/admin/update',
        method: 'post',
        data
    });
}

export function AdminDelete (data) {
    return request({
        url: '/admin/delete',
        method: 'post',
        data
    });
}

export function AdminModule (params) {
    return request({
        url: '/admin/module',
        method: 'get',
        params
    });
}
