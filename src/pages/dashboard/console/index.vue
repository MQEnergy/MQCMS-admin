<template>
    <div style="padding-top: 16px;" v-resize="handleResize">
    
    </div>
</template>
<script>
    import baseInfo from './base-info';
    import gridMenu from './grid-menu';
    import visitChart from './visit-chart';
    import hotSearch from './hot-search';
    import userPreference from './user-preference';

    export default {
        name: 'dashboard-console',
        components: { baseInfo, gridMenu, visitChart, hotSearch, userPreference },
        data () {
            return {
                visitType: 'day', // day, month, year
                visitDate: [(new Date()), (new Date())]
            }
        },
        methods: {
            handleChangeVisitType (val) {
                if (val === 'day') {
                    this.visitDate = [(new Date()), (new Date())];
                } else if (val === 'month') {
                    this.visitDate = [(new Date() - 86400000 * 30), (new Date())];
                } else if (val === 'year') {
                    this.visitDate = [(new Date() - 86400000 * 365), (new Date())];
                }
            },
            // 监听页面宽度变化，刷新表格
            handleResize () {
                this.$refs.baseInfo.handleResize();
                this.$refs.visitChart.handleResize();
                this.$refs.hotSearch.handleResize();
            }
        }
    }
</script>
<style lang="less">
    .dashboard-console-visit{
        .ivu-radio-group-button .ivu-radio-wrapper{
            border: none !important;
            box-shadow: none !important;
            padding: 0 12px;
        }
        .ivu-radio-group-button .ivu-radio-wrapper:before, .ivu-radio-group-button .ivu-radio-wrapper:after{
            display: none;
        }
    }
</style>
