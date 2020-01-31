/**
 * 通用混合
 * */
export default {
    methods: {
        // 当 $route 更新时触发
        appRouteChange (to, from) {

        },
        getUploadUrl () {
            return process.env.VUE_APP_UPLOAD_HOST_URL;
        },
        getAppModuleUrl () {
            return process.env.VUE_APP_API_MODULE;
        }
    }
}
