<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="用户列表" content="" hidden-breadcrumb />
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <search-form @on-submit="getData" @on-reset="getData" />
            <list ref="list" />
        </Card>
    </div>
</template>
<script>
    import searchForm from './search-form';
    import list from './list';

    export default {
        name: 'user-index',
        components: { searchForm, list },
        data () {
            return {

            }
        },
        methods: {
            getData () {
                this.$refs.list.getData();
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>
