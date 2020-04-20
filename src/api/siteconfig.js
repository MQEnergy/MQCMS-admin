import request from '@/plugins/request';

export function SiteConfigStore (data) {
    return request({
        url: '/site_config/store',
        method: 'post',
        data
    });
}

export function SiteConfigShow (params) {
    return request({
        url: '/site_config/show',
        method: 'get',
        params
    });
}

export function SiteConfigUpdate (data) {
    return request({
        url: '/site_config/update',
        method: 'post',
        data
    });
}

export function SiteConfigDelete (data) {
    return request({
        url: '/site_config/delete',
        method: 'post',
        data
    });
}
