<template>
    <div class="page-account">
        <div class="page-account-container">
            <div class="page-account-top">
                <div class="page-account-top-logo">
                    <img src="@/assets/images/logo.png" alt="logo">
                </div>
                <div class="page-account-top-desc">MQCMS管理系统</div>
            </div>
        </div>
        <i-copyright />
    </div>
</template>
<script>
    import iCopyright from '@/components/copyright';
    import { mapActions } from 'vuex';
    import mixins from '../mixins';

    export default {
        mixins: [ mixins ],
        components: { iCopyright },
        data () {
            return {
                autoLogin: true,
                passwordRule: [
                    {
                        required: true, message: '密码不能为空！', trigger: 'change'
                    },
                    {
                        min: 6, message: '密码不能少于6位！', trigger: 'change'
                    }
                ]
            }
        },
        methods: {
            ...mapActions('admin/account', [
                'login'
            ]),
            /**
             * @description 登录
             * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
             */
            handleSubmit (valid, values) {
                if (valid) {
                    const { account, password } = values;
                    this.login({
                        account,
                        password
                    })
                        .then(() => {
                            // 重定向对象不存在则返回顶层路径
                            this.$router.replace(this.$route.query.redirect || '/');
                    });
                }
            }
        }
    };
</script>
