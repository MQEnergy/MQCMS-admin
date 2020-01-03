/**
 * @description 鉴权指令
 */
import store from '@/store';
import { includeArray } from '@/libs/system';

export default {
    inserted (el, binding, vnode) {
        const { value } = binding;
        const access = store.state.admin.user.info.access;

        if (value && value instanceof Array && value.length && access && access.length) {
            const isPermission = includeArray(value, access);
            if (!isPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
}
