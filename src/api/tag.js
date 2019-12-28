import request from '@/plugins/request';

export function TagIndex (params) {
    return request({
        url: '/tag/index',
        method: 'get',
        params
    });
}

export function TagSearch (data) {
    return request({
        url: '/tag/index',
        method: 'post',
        data
    });
}

export function TagShow (params) {
    return request({
        url: '/tag/show',
        method: 'get',
        params
    });
}

export function TagStore (data) {
    return request({
        url: '/tag/store',
        method: 'post',
        data
    });
}

export function TagUpdate (data) {
    return request({
        url: '/tag/update',
        method: 'post',
        data
    });
}

export function TagDelete (data) {
    return request({
        url: '/tag/delete',
        method: 'post',
        data
    });
}
