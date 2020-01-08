import request from '@/plugins/request';

export function PostIndex (params) {
    return request({
        url: '/post/index',
        method: 'get',
        params
    });
}

export function PostSearch (data) {
    return request({
        url: '/post/index',
        method: 'post',
        data
    });
}

export function PostStore (data) {
    return request({
        url: '/post/store',
        method: 'post',
        data
    });
}

export function PostShow (params) {
    return request({
        url: '/post/show',
        method: 'get',
        params
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
