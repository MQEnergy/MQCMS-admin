<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="模板管理" content="" hidden-breadcrumb />
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Row :gutter="24" class="ivu-mt">
                <Col :xxl="4" :xl="6" :lg="6" :md="12" :sm="12" :xs="24" v-for="(item, index) in themeList" :key="index" class="ivu-mb">
                    <Card :padding="0" class="search-search-projects-item">
                        <img :src="item.full_thumb_url" class="search-search-projects-item-cover">
                        <div class="ivu-p-8">
                            <p>名称：{{ item.theme_name }} <Tag v-if="item.is_used" color="success">当前启用</Tag></p>
                            <p>版本：{{ item.version }}</p>
                            <p>作者：{{ item.author }}</p>
                        </div>
                        <Divider class="ivu-mb-8 ivu-mt-8" />
                        <Row class="ivu-text-center ivu-pb-8">
                            <Col span="12" class="ivu-br">
                                <Tooltip placement="top" content="访问官网">
                                    <i-link :to="item.link_url" target="_blank">
                                        <Button icon="md-open" type="text" size="large" />
                                    </i-link>
                                </Tooltip>
                            </Col>
                            <Col v-if="item.is_used == 1" span="12" class="ivu-br">
                                <Tooltip placement="top" content="编辑">
                                    <Button @click="handleEdit" icon="md-create" type="text" size="large" />
                                </Tooltip>
                            </Col>
                            <Col v-else span="12" class="ivu-br">
                                <Tooltip placement="top" content="启动">
                                    <Button @click="handleOnload" icon="md-checkmark" type="text" size="large" />
                                </Tooltip>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
    import {ThemeConfigIndex} from "@api/themeconfig";

    export default {
        name: 'setting-theme',
        components: {
        },
        data () {
            return {
                themeList: [],
            }
        },
        mounted() {
            this.handleThemeList();
        },
        methods: {
            handleThemeList () {
                ThemeConfigIndex().then(res => {
                    this.themeList = res.data;
                });
            },
            handleEdit () {

            },
            handleOnload () {

            }
        }
    }
</script>
<style lang="less" scoped>
    .search-search-projects{
        &-item{
            &-cover{
                width: 100%;
                height: 200px;
                border-radius: 4px 4px 0 0;
            }
        }
    }
</style>
