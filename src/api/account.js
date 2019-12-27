import request from '@/plugins/request';

export function AccountLogin (data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data
    });
}

export function AccountRegister (data) {
    return request({
        url: '/auth/register',
        method: 'post',
        data
    });
}

export function AccountLogout () {
    return request({
        url: '/auth/logout',
        method: 'post'
    });
}
