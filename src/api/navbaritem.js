import request from '@/plugins/request';

export function NavigationItemIndex (params) {
    return request({
        url: '/navigation_item/index',
        method: 'get',
        params
    });
}

export function NavigationItemSearch (data) {
    return request({
        url: '/navigation_item/index',
        method: 'post',
        data
    });
}

export function NavigationItemStore (data) {
    return request({
        url: '/navigation_item/store',
        method: 'post',
        data
    });
}

export function NavigationItemShow (params) {
    return request({
        url: '/navigation_item/show',
        method: 'get',
        params
    });
}

export function NavigationItemUpdate (data) {
    return request({
        url: '/navigation_item/update',
        method: 'post',
        data
    });
}

export function NavigationItemDelete (data) {
    return request({
        url: '/navigation_item/delete',
        method: 'post',
        data
    });
}

export function NavigationItemList (params) {
    return request({
        url: '/navigation_item/list',
        method: 'get',
        params
    });
}
