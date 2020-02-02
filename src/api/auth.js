import request from '@/plugins/request';

export function AuthIndex (params) {
    return request({
        url: '/auth/index',
        method: 'get',
        params
    });
}

export function AuthSearch (data) {
    return request({
        url: '/auth/index',
        method: 'post',
        data
    });
}

export function AuthStore (data) {
    return request({
        url: '/auth/store',
        method: 'post',
        data
    });
}

export function AuthShow (data) {
    return request({
        url: '/auth/show',
        method: 'get',
        data
    });
}

export function AuthUpdate (data) {
    return request({
        url: '/auth/update',
        method: 'post',
        data
    });
}

export function AuthDelete (data) {
    return request({
        url: '/auth/delete',
        method: 'post',
        data
    });
}
