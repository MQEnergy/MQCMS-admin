<template>
    <div class="page-account">
        <div class="page-account-container page-account-container-result">
            <div class="page-account-top">
                <div class="page-account-top-logo">
                    <img src="@/assets/images/logo.png" alt="logo">
                </div>
                <div class="page-account-top-desc">MQCMS管理系统</div>
            </div>
            <Result type="success" :title="title" :desc="desc">
                <div slot="actions">
                    <Button size="large" type="primary" to="/login">去登录</Button>
                </div>
            </Result>
        </div>
        <i-copyright />
    </div>
</template>
<script>
    import iCopyright from '@/components/copyright';

    export default {
        components: { iCopyright },
        data () {
            return {
                title: '你的账户注册成功',
                desc: ''
            }
        }
    };
</script>
