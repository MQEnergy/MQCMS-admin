<template>
    <div>
        <div class="i-layout-page-header">
            <page-header
                title="搜索列表（项目）"
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
                <FormItem label="排序：">
                    <RadioGroup v-model="order">
                        <Radio label="new">最新创建</Radio>
                        <Radio label="update">最后更新</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Card>

        <project-template :project-list="projectList" />
        <div v-height="120" v-if="loading" style="position: relative">
            <Spin size="large" fix></Spin>
        </div>
    </div>
</template>
<script>
    import mixin from '../mixins';
    import projectTemplate from './template';
    import dataList from './data';

    export default {
        name: 'search-search-projects',
        mixins: [ mixin ],
        components: { projectTemplate },
        data () {
            return {
                tabActiveKey: 'projects',
                type: [],
                order: 'new',
                projectList: [],
                loading: false
            }
        },
        methods: {
            getProject () {
                this.loading = true;
                setTimeout(() => {
                    this.projectList = dataList;
                    this.loading = false;
                }, 1000);
            }
        },
        mounted () {
            this.getProject();
        }
    }
</script>
