<template>
    <div class="setting-account-safety">
        <h2>安全设置</h2>
        <div class="ivu-mt ivu-pl ivu-pr">
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>账户密码</h4>
                    <p>绑定手机和邮箱，并设置密码，帐号更安全</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <i-link link-color>修改</i-link>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>绑定手机</h4>
                    <p>已绑定手机号：+86185****0000</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <i-link link-color>修改</i-link>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>密保问题</h4>
                    <p>未设置密保问题，密保问题可有效保护账户安全</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <i-link link-color>设置</i-link>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="center" align="middle">
                <Col span="22">
                    <h4>个性域名</h4>
                    <p>已绑定域名：iview.design</p>
                </Col>
                <Col span="2" class="ivu-text-right">
                    <i-link link-color>修改</i-link>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>
<style lang="less">
    .setting-account-safety{
        .ivu-col{
            p{
                margin-top: 8px;
                color: #808695;
            }
        }
    }
</style>
