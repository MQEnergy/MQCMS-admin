import request from '@/plugins/request';

export function ThemeConfigIndex (data) {
    return request({
        url: '/theme_config/index',
        method: 'get',
        data
    });
}

export function ThemeConfigStore (data) {
    return request({
        url: '/theme_config/store',
        method: 'post',
        data
    });
}

export function ThemeConfigShow (params) {
    return request({
        url: '/theme_config/show',
        method: 'get',
        params
    });
}

export function ThemeConfigUpdate (data) {
    return request({
        url: '/theme_config/update',
        method: 'post',
        data
    });
}

export function ThemeConfigDelete (data) {
    return request({
        url: '/theme_config/delete',
        method: 'post',
        data
    });
}
