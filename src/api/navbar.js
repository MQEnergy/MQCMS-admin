import request from '@/plugins/request';

export function NavigationIndex (params) {
    return request({
        url: '/navigation/index',
        method: 'get',
        params
    });
}

export function NavigationSearch (data) {
    return request({
        url: '/navigation/index',
        method: 'post',
        data
    });
}

export function NavigationStore (data) {
    return request({
        url: '/navigation/store',
        method: 'post',
        data
    });
}

export function NavigationShow (params) {
    return request({
        url: '/navigation/show',
        method: 'get',
        params
    });
}

export function NavigationUpdate (data) {
    return request({
        url: '/navigation/update',
        method: 'post',
        data
    });
}

export function NavigationDelete (data) {
    return request({
        url: '/navigation/delete',
        method: 'post',
        data
    });
}
