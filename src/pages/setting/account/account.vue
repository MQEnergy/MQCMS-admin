<template>
    <div class="setting-account-account">
        <h2>账号绑定</h2>
        <div class="ivu-mt ivu-pl ivu-pr">
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>
                        <Avatar size="small" :src="icon.wechat" />
                        <span>微信</span>
                    </h4>
                    <p>当前未绑定微信账号</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <i-link link-color>绑定</i-link>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>
                        <Avatar size="small" :src="icon.weibo" />
                        <span>微博</span>
                    </h4>
                    <p>当前未绑定微博账号</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <i-link link-color>绑定</i-link>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>
                        <Avatar size="small" :src="icon.facebook" />
                        <span>Facebook</span>
                    </h4>
                    <p>当前未绑定 Facebook 账号</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <i-link link-color>绑定</i-link>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>
                        <Avatar size="small" :src="icon.twitter" />
                        <span>Twitter</span>
                    </h4>
                    <p>当前未绑定 Twitter 账号</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <i-link link-color>绑定</i-link>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    import iconWechat from '@/assets/svg/icon-social-wechat.svg';
    import iconWeibo from '@/assets/svg/icon-social-weibo.svg';
    import iconFacebook from '@/assets/svg/icon-social-facebook.svg';
    import iconTwitter from '@/assets/svg/icon-social-twitter.svg';

    export default {
        data () {
            return {
                icon: {
                    wechat: iconWechat,
                    weibo: iconWeibo,
                    facebook: iconFacebook,
                    twitter: iconTwitter
                }
            }
        }
    }
</script>
<style lang="less">
    .setting-account-account{
        .ivu-col{
            h4{
                span{
                    margin-right: 8px;
                }
            }
            p{
                margin-top: 8px;
                color: #808695;
            }
        }
    }
</style>
