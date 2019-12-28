<template>
    <div>
        <div class="i-layout-page-header">
            <page-header
                title="搜索列表（组件）"
                hidden-breadcrumb
                :tab-list="tabList"
                :tab-active-key="tabActiveKey"
                @on-tab-change="handleChangeTab"
            >
                <div slot="content" class="ivu-mt ivu-mb" style="max-width: 500px;margin: 0 auto;">
                    <Input search size="large" enter-button="搜索" placeholder="请输入组件名称搜索" />
                </div>
            </page-header>
        </div>
        <components-search @on-ok="handleSearch" />
        <components-template :project-list="projectList" />
        <div v-height="120" v-if="loading" style="position: relative">
            <Spin size="large" fix style="background: none"></Spin>
        </div>
        <div class="ivu-text-center ivu-mt">
            <Button :loading="loading" @click="getProject" w-width="200">
                <template v-if="loading">加载中...</template>
                <template v-else>加载更多</template>
            </Button>
        </div>
    </div>
</template>
<script>
    import mixin from '../mixins';
    import componentsTemplate from './template';
    import componentsSearch from './search';
    import dataList from './data';

    export default {
        name: 'application-store-components',
        mixins: [ mixin ],
        components: {
            componentsTemplate,
            componentsSearch
        },
        data () {
            return {
                tabActiveKey: 'components',
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
            },
            handleSearch () {
            }
        },
        mounted () {
            this.getProject();
        }
    }
</script>
