<template>
    <div>
        <div class="i-layout-page-header">
            <page-header
                title="我的应用"
                hidden-breadcrumb
                :tab-list="tabList"
                :tab-active-key="tabActiveKey"
                @on-tab-change="handleChangeTab"
            >
            </page-header>
        </div>
        <app-template :app-list="appList" />
        <div v-height="120" v-if="loading" style="position: relative">
            <Spin size="large" fix style="background: none"></Spin>
        </div>
        <div class="ivu-text-center ivu-mt">
            <Button :loading="loading" @click="getApp" w-width="200">
                <template v-if="loading">加载中...</template>
                <template v-else>加载更多</template>
            </Button>
        </div>
    </div>
</template>
<script>
    import mixin from '../mixins';
    import appTemplate from './template';
    import dataList from './data';

    export default {
        name: 'application-store-apps',
        mixins: [ mixin ],
        components: {
            appTemplate
        },
        data () {
            return {
                tabActiveKey: 'apps',
                type: [],
                order: 'new',
                appList: [],
                loading: false
            }
        },
        methods: {
            getApp () {
                this.loading = true;
                setTimeout(() => {
                    this.appList = dataList;
                    this.loading = false;
                }, 1000);
            },
            handleSearch () {
            }
        },
        mounted () {
            this.getApp();
        }
    }
</script>
