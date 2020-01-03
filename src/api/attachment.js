import request from '@/plugins/request';

export function AttachmentIndex (params) {
    return request({
        url: '/attachment/index',
        method: 'get',
        params
    });
}

export function AttachmentSearch (data) {
    return request({
        url: '/attachment/index',
        method: 'post',
        data
    });
}

export function AttachmentStore (data) {
    return request({
        url: '/attachment/store',
        method: 'post',
        data
    });
}

export function AttachmentShow (data) {
    return request({
        url: '/attachment/show',
        method: 'get',
        data
    });
}

export function AttachmentUpdate (data) {
    return request({
        url: '/attachment/update',
        method: 'post',
        data
    });
}

export function AttachmentDelete (data) {
    return request({
        url: '/attachment/delete',
        method: 'post',
        data
    });
}
