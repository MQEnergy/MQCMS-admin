<template>
    <Row :gutter="24" class="ivu-mt">
        <Col :xl="compact ? 12 : 6" :lg="compact ? 12 : 8" :md="12" :sm="12" :xs="24" v-for="(item, index) in appList" :key="index" class="ivu-mb">
            <Card :shadow="!bordered" :bordered="bordered" :dis-hover="bordered" :padding="0">
                <div class="ivu-pt ivu-pl ivu-pr">
                    <div>
                        <Avatar :src="item.icon" />
                        <strong class="ivu-ml">{{ item.title }}</strong>
                    </div>
                    <div class="ivu-mt">
                        <div>负责人：{{ item.owner }}</div>
                        <div>最后更新时间：<Time :time="item.time" type="date" /></div>
                    </div>
                </div>
                <Divider class="ivu-mb-8" />
                <Row class="ivu-text-center ivu-pb-8">
                    <Col span="6" class="ivu-br">
                        <Tooltip placement="top" content="访问">
                            <i-link :to="item.link" target="_blank">
                                <Button icon="md-open" type="text" size="large" />
                            </i-link>
                        </Tooltip>
                    </Col>
                    <Col span="6" class="ivu-br">
                        <Tooltip placement="top" content="下载">
                            <i-link>
                                <Button icon="md-download" type="text" size="large" />
                            </i-link>
                        </Tooltip>
                    </Col>
                    <Col span="6" class="ivu-br">
                        <Tooltip placement="top" content="编辑">
                            <i-link>
                                <Button icon="md-create" type="text" size="large" />
                            </i-link>
                        </Tooltip>
                    </Col>
                    <Col span="6">
                        <Dropdown>
                            <Button icon="md-share" type="text" size="large" />
                            <DropdownMenu slot="list" class="ivu-text-left">
                                <DropdownItem>
                                    <Avatar icon="logo-googleplus" size="small" />
                                    <span class="ivu-ml-8">Google Plus</span>
                                </DropdownItem>
                                <DropdownItem>
                                    <Avatar icon="logo-facebook" size="small" />
                                    <span class="ivu-ml-8">Facebook</span>
                                </DropdownItem>
                                <DropdownItem>
                                    <Avatar icon="logo-twitter" size="small" />
                                    <span class="ivu-ml-8">Twitter</span>
                                </DropdownItem>
                                <DropdownItem>
                                    <Avatar icon="logo-linkedin" size="small" />
                                    <span class="ivu-ml-8">LinkedIn</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
</template>
<script>
    export default {
        props: {
            appList: {
                type: Array
            },
            compact: {
                type: Boolean,
                default: false
            },
            bordered: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
