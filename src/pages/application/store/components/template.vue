<template>
    <Row :gutter="24" class="ivu-mt">
        <Col :xl="compact ? 8 : 4" :lg="compact ? 8 : 6" :md="12" :sm="12" :xs="24" v-for="(item, index) in projectList" :key="index" class="ivu-mb">
            <i-link :to="item.link" target="_blank">
                <Card :bordered="bordered" :padding="0" class="search-search-projects-item">
                    <img :src="item.cover" class="search-search-projects-item-cover">
                    <div class="ivu-p-8">
                        <div>
                            <strong>{{ item.title }}</strong>
                        </div>
                        <div class="search-search-projects-item-desc">{{ item.desc }}</div>
                        <div class="search-search-projects-item-extra ivu-mt-8 ivu-pb-8">
                            <Time :time="item.time" type="date" />
                            <span class="ivu-fr">
                                <AvatarList :list="avatarList" size="small" />
                            </span>
                        </div>
                    </div>
                    <Divider class="ivu-mb-8" />
                    <Row class="ivu-text-center ivu-pb-8">
                        <Col span="12" class="ivu-br">
                            <Tooltip placement="top" content="访问官网">
                                <i-link :to="item.link" target="_blank">
                                    <Button icon="md-open" type="text" size="large" />
                                </i-link>
                            </Tooltip>
                        </Col>
                        <Col span="12" class="ivu-br">
                            <Tooltip placement="top" content="安装组件">
                                <i-link>
                                    <Button icon="md-download" type="text" size="large" />
                                </i-link>
                            </Tooltip>
                        </Col>
                    </Row>
                </Card>
            </i-link>
        </Col>
    </Row>
</template>
<script>
    export default {
        props: {
            projectList: {
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
        },
        data () {
            return {
                avatarList: [
                    {
                        src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
                        tip: '史蒂夫·乔布斯'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
                        tip: '斯蒂夫·沃兹尼亚克'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
                        tip: '乔纳森·伊夫'
                    }
                ]
            }
        }
    }
</script>
<style lang="less">
    .search-search-projects{
        &-item{
            &-cover{
                width: 100%;
                border-radius: 4px 4px 0 0;
            }
            &-desc{
                display: -webkit-box;
                height: 40px;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            &-extra{
                span{
                    display: inline-block;
                    color: #808695;
                    vertical-align: middle;
                }
            }
        }
    }
</style>
