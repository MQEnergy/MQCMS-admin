<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="用户信息" content="" hidden-breadcrumb />
        </div>
        <Row class="ivu-pt-16" :gutter="24">
            <Col :xl="6" :lg="6" :md="0" :sm="0" :xs="0">
                <Card shadow title="个人设置" icon="md-options" :padding="0">
                    <CellGroup @on-click="handleChangeCell" class="ivu-pt-8 ivu-pb-8">
                        <Cell title="基本设置" name="info" label="个人账户信息设置" :selected="currentType === 'info'" />
                        <Cell title="安全设置" name="safety" label="密码、邮箱等设置" :selected="currentType === 'safety'" />
                        <Cell title="账号绑定" name="account" label="绑定第三方社交账户" :selected="currentType === 'account'" />
                        <Cell title="新消息通知" name="notification" label="各种通知的设置" :selected="currentType === 'notification'" />
                    </CellGroup>
                </Card>
            </Col>
            <Col :xl="18" :lg="18" :md="24" :sm="24" :xs="24">
                <Card :bordered="false" dis-hover>
                    <Row>
                        <Col :xl="0" :lg="0" :md="24" :sm="24" :xs="24">
                            <Tabs :value="currentType" @on-click="handleChangeCell">
                                <TabPane label="基本设置" name="info" />
                                <TabPane label="安全设置" name="safety" />
                                <TabPane label="账号绑定" name="account" />
                                <TabPane label="新消息通知" name="notification" />
                            </Tabs>
                        </Col>
                    </Row>
                    <info v-if="currentType === 'info'" />
                    <safety v-if="currentType === 'safety'" />
                    <account v-if="currentType === 'account'" />
                    <notification v-if="currentType === 'notification'" />
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import info from './info';
    import safety from './safety';
    import account from './account';
    import notification from './notification';

    export default {
        name: 'setting-account',
        components: { info, safety, account, notification },
        data () {
            return {
                currentType: 'info' // info | safety | account | notification
            }
        },
        methods: {
            handleChangeCell (name) {
                this.currentType = name;
            }
        }
    }
</script>
