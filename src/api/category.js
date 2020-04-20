import request from '@/plugins/request';

export function CategoryIndex (params) {
    return request({
        url: '/category/index',
        method: 'get',
        params
    });
}

export function CategorySearch (data) {
    return request({
        url: '/category/index',
        method: 'post',
        data
    });
}

export function CategoryStore (data) {
    return request({
        url: '/category/store',
        method: 'post',
        data
    });
}

export function CategoryShow (params) {
    return request({
        url: '/category/show',
        method: 'get',
        params
    });
}

export function CategoryUpdate (data) {
    return request({
        url: '/category/update',
        method: 'post',
        data
    });
}

export function CategoryDelete (data) {
    return request({
        url: '/category/delete',
        method: 'post',
        data
    });
}
