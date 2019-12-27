<template>
    <div v-resize="handleResize">
        <div class="i-layout-page-header">
            <PageHeader title="卡片列表" content="卡片类型的列表，配合栅格实现响应式布局。" hidden-breadcrumb />
        </div>
        <Row type="flex" justify="center" align="middle" :gutter="24" class="ivu-mt">
            <Col :xl="8" :lg="8" :md="12" :sm="24" :xs="24" class="ivu-mb">
                <Button type="dashed" icon="md-add" long v-height="200">新增产品</Button>
            </Col>
            <Col :xl="8" :lg="8" :md="12" :sm="24" :xs="24" class="ivu-mb" v-for="item in data" :key="item.project">
                <a>
                    <Card shadow :padding="0" v-height="200">
                        <List item-layout="vertical" class="ivu-pl ivu-pr">
                            <ListItem>
                                <ListItemMeta :title="item.project">
                                    <Avatar :src="item.icon" slot="avatar" size="large" />
                                    <div slot="description" class="list-card-list-desc">
                                        <Ellipsis ref="ellipsis" :text="item.desc" :lines="4" />
                                    </div>
                                </ListItemMeta>
                                <template slot="action">
                                    <Divider class="ivu-mb-8" />
                                    <li v-width="'50%'">操作一</li>
                                    <li v-width="'50%'">操作二</li>
                                </template>
                            </ListItem>
                        </List>
                    </Card>
                </a>
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
                data: []
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
