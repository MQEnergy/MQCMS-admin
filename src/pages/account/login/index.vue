<template>
    <div class="page-account">
        <div class="page-account-container">
            <div class="page-account-container-content">
                <div class="page-account-top">
                    <div class="page-account-top-logo">
                        <img src="@/assets/images/logo.png" alt="logo">
                    </div>
                    <div class="page-account-top-desc">MQCMS管理系统</div>
                </div>
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="account">
                        <Input type="text" size="large" v-model="formInline.account" placeholder="请输入账号">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" size="large" v-model="formInline.password" placeholder="请输入密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button class="ivu-btn-long" type="primary" size="large" @click="handleSubmit('formInline')">登录</Button>
                    </FormItem>
                </Form>
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
                formInline: {
                    account: '',
                    password: ''
                },
                ruleInline: {
                    account: [
                        { required: true, message: '请输入账号！', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码！', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6位！', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapActions('admin/account', [
                'login'
            ]),
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.login(this.formInline)
                          .then(() => {
                              // 重定向对象不存在则返回顶层路径
                              this.$router.replace(this.$route.query.redirect || '/');
                          });
                    } else {
                        return false;
                    }
                })
            }
        }
    };
</script>
<style scoped>
    .ivu-btn-long {
        margin-top: 20px;
    }
</style>
