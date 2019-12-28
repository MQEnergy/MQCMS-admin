<template>
    <div v-resize="handleResize">
        <div class="i-layout-page-header">
            <page-header title="卡片列表" content="卡片类型的列表，配合栅格实现响应式布局。" hidden-breadcrumb />
        </div>
        <Row type="flex" justify="center" align="middle" :gutter="24" class="ivu-mt">
            <Col :xl="8" :lg="8" :md="12" :sm="24" :xs="24" class="ivu-mb">
                <Button type="dashed" icon="md-add" long v-height="200">新增产品</Button>
            </Col>
            <Col :xl="8" :lg="8" :md="12" :sm="24" :xs="24" class="ivu-mb" v-for="item in data" :key="item.project">
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
                        <Col span="12" class="ivu-br">
                            <Tooltip placement="top" content="访问">
                                <i-link :to="item.link" target="_blank">
                                    <Button icon="md-open" type="text" size="large" />
                                </i-link>
                            </Tooltip>
                        </Col>
                        <Col span="12" class="ivu-br">
                            <Tooltip placement="top" content="安装应用">
                                <i-link>
                                    <Button icon="md-download" type="text" size="large" />
                                </i-link>
                            </Tooltip>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import listData from './data';

    export default {
        name: 'list-card-list',
        data () {
            return {
                data: [],
                bordered: false
            }
        },
        methods: {
            getData () {
                this.data = listData;
            },
            handleResize () {
                this.$refs.ellipsis.forEach(item => item.init());
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>
<style lang="less">
    .list-card-list{
        &-desc{
            height: 85px;
            overflow: hidden;
        }
    }
</style>
