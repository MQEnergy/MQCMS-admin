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
            const validatePassCheck = (rule, value, callback) => {
                if (value !== this.$refs.form.formValidate.password) {
                    callback(new Error('两次输入的密码不匹配！'));
                } else {
                    callback();
                }
            };
            return {
                passwordRule: [
                    {
                        required: true, message: '密码不能为空！', trigger: 'change'
                    },
                    {
                        min: 6, message: '密码不能少于6位！', trigger: 'change'
                    }
                ],
                passwordConfirmRule: [
                    {
                        required: true, message: '确认密码不能为空！', trigger: 'change'
                    },
                    { validator: validatePassCheck, trigger: 'change' }
                ],
                passwordLen: 0
            }
        },
        computed: {
            passwordTip () {
                let strong = '强';
                let className = 'strong';
                let percent = this.passwordLen > 10 ? 10 : this.passwordLen;
                let color = '#19be6b';

                if (this.passwordLen < 6) {
                    strong = '太短';
                    className = 'low';
                    color = '#ed4014';
                } else if (this.passwordLen < 10) {
                    strong = '中';
                    className = 'medium';
                    color = '#ff9900';
                }

                return {
                    strong,
                    class: `page-account-register-tip-${className}`,
                    percent: percent * 10,
                    color
                }
            }
        },
        methods: {
            ...mapActions('admin/account', [
                'register',
                'login'
            ]),
            handleChangePassword (val) {
                this.passwordLen = val.length;
            },
            /**
             * @description 注册
             */
            handleSubmit (valid, values) {
                if (valid) {
                    if (valid) {
                        const { email, account, password, phone, captcha } = values;
                        this.register({
                            email,
                            account,
                            password,
                            phone,
                            captcha
                        })
                            .then(() => {
                                this.$router.replace({ name: 'register-result' });
                        });
                    }
                }
            },
            /**
             * @description 获取验证码
             * */
            handleGetCaptcha () {

            }
        }
    };
</script>
