<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="管理员列表" content="" hidden-breadcrumb />
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <list ref="list" />
        </Card>
    </div>
</template>
<script>
    import list from './list';

    export default {
        name: 'admin-index',
        components: {
            list
        },
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
