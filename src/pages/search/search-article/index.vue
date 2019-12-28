<template>
    <div>
        <div class="i-layout-page-header">
            <page-header
                title="搜索列表（文章）"
                hidden-breadcrumb
                :tab-list="tabList"
                :tab-active-key="tabActiveKey"
                @on-tab-change="handleChangeTab"
            >
                <div slot="content" class="ivu-mt ivu-mb" style="max-width: 500px;margin: 0 auto;">
                    <Input search size="large" enter-button="搜索" placeholder="Enter something..." />
                </div>
            </page-header>
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Form>
                <FormItem label="分类：">
                    <TagSelect v-model="type" expandable>
                        <TagSelectOption name="type1">类别一</TagSelectOption>
                        <TagSelectOption name="type2">类别二</TagSelectOption>
                        <TagSelectOption name="type3">类别三</TagSelectOption>
                        <TagSelectOption name="type4">类别四</TagSelectOption>
                        <TagSelectOption name="type5">类别五</TagSelectOption>
                        <TagSelectOption name="type6">类别六</TagSelectOption>
                        <TagSelectOption name="type7">类别七</TagSelectOption>
                        <TagSelectOption name="type8">类别八</TagSelectOption>
                        <TagSelectOption name="type9">类别九</TagSelectOption>
                        <TagSelectOption name="type10">类别十</TagSelectOption>
                        <TagSelectOption name="type11">类别十一</TagSelectOption>
                        <TagSelectOption name="type12">类别十二</TagSelectOption>
                        <TagSelectOption name="type13">类别十三</TagSelectOption>
                        <TagSelectOption name="type14">类别十四</TagSelectOption>
                        <TagSelectOption name="type15">类别十五</TagSelectOption>
                        <TagSelectOption name="type16">类别十六</TagSelectOption>
                    </TagSelect>
                </FormItem>
                <Divider dashed />
                <FormItem label="作者：">
                    <Select v-model="auth" multiple v-width="240">
                        <Option value="Aresn">Aresn</Option>
                        <Option value="中小鱼">中小鱼</Option>
                        <Option value="Echo">Echo</Option>
                        <Option value="唐不苦">唐不苦</Option>
                        <Option value="甜筒">甜筒</Option>
                    </Select>
                </FormItem>
                <Divider dashed />
                <FormItem label="排序：">
                    <RadioGroup v-model="order">
                        <Radio label="new">最新发表</Radio>
                        <Radio label="hot">最多收藏</Radio>
                        <Radio label="click">最多阅读</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Card>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <article-template :article-list="articleList" />
            <div v-height="120" v-if="loading" style="position: relative">
                <Spin size="large" fix></Spin>
            </div>
            <div class="ivu-text-center ivu-mt">
                <Button :loading="loading" @click="getArticle" w-width="200">
                    <template v-if="loading">加载中...</template>
                    <template v-else>加载更多</template>
                </Button>
            </div>
        </Card>
    </div>
</template>
<script>
    import mixin from '../mixins';
    import articleTemplate from './template';
    import dataList from './data';

    export default {
        name: 'search-search-article',
        mixins: [ mixin ],
        components: { articleTemplate },
        data () {
            return {
                tabActiveKey: 'article',
                type: [],
                auth: ['Aresn', 'Echo'],
                order: 'new',
                articleList: [],
                loading: false
            }
        },
        methods: {
            getArticle () {
                this.loading = true;
                setTimeout(() => {
                    this.articleList = this.articleList.concat(dataList);
                    this.loading = false;
                }, 1000);
            }
        },
        mounted () {
            this.getArticle();
        }
    }
</script>
