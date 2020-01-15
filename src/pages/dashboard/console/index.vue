<template>
    <div style="padding-top: 46px; text-align: center" v-resize="handleResize">
        <img src="@/assets/images/logo.png" alt="">
        <p>
            MQCMS是一款现代化，快速，高效，灵活，前后端分离，扩展性强的CMS系统。
            MQCMS中的MQ取麻雀拼音首字母。寓意麻雀虽小五脏俱全。
        </p>
        <p style="margin-top: 20px;">
            前端项目仓库：
            <i-link link-color="true" target="_blank" href="https://github.com/MQEnergy/MQCMS-admin">https://github.com/MQEnergy/MQCMS-admin</i-link>
            <br>
            后端项目仓库：
            <i-link link-color="true" target="_blank" href="https://github.com/MQEnergy/MQCMS">https://github.com/MQEnergy/MQCMS</i-link>
        </p>
    </div>
</template>
<script>
    import baseInfo from './base-info';
    import gridMenu from './grid-menu';
    import visitChart from './visit-chart';
    import hotSearch from './hot-search';
    import userPreference from './user-preference';
    import ILink from '@/components/link';

    export default {
        name: 'dashboard-console',
        components: { baseInfo, gridMenu, visitChart, hotSearch, userPreference, ILink },
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
</style>
