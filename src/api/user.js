import request from '@/plugins/request';

export function UserIndex (params) {
    return request({
        url: '/user/index',
        method: 'get',
        params
    });
}

export function UserSearch (data) {
    return request({
        url: '/user/index',
        method: 'post',
        data
    });
}

export function UserShow (params) {
    return request({
        url: '/user/show',
        method: 'get',
        params
    });
}

export function UserStore (data) {
    return request({
        url: '/user/store',
        method: 'post',
        data
    });
}

export function UserUpdate (data) {
    return request({
        url: '/user/update',
        method: 'post',
        data
    });
}

export function UserDelete (data) {
    return request({
        url: '/user/delete',
        method: 'post',
        data
    });
}
