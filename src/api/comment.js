import request from '@/plugins/request';

export function CommentIndex (params) {
    return request({
        url: '/comment/index',
        method: 'get',
        params
    });
}

export function CommentSearch (data) {
    return request({
        url: '/comment/index',
        method: 'post',
        data
    });
}

export function CommentStore (data) {
    return request({
        url: '/comment/store',
        method: 'post',
        data
    });
}

export function CommentShow (data) {
    return request({
        url: '/comment/show',
        method: 'get',
        data
    });
}

export function CommentUpdate (data) {
    return request({
        url: '/comment/update',
        method: 'post',
        data
    });
}

export function CommentDelete (data) {
    return request({
        url: '/comment/delete',
        method: 'post',
        data
    });
}
