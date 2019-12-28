import request from '@/plugins/request';

export function PostIndex (params) {
    return request({
        url: '/post/index',
        method: 'get',
        params
    });
}

export function PostStore (data) {
    return request({
        url: '/post/store',
        method: 'post',
        data
    });
}

export function PostShow (data) {
    return request({
        url: '/post/show',
        method: 'get',
        data
    });
}

export function PostUpdate (data) {
    return request({
        url: '/post/update',
        method: 'post',
        data
    });
}

export function PostDelete (data) {
    return request({
        url: '/post/delete',
        method: 'post',
        data
    });
}
