<template>
    <div style="padding-top: 46px; text-align: center" v-resize="handleResize">
        <img src="@/assets/images/logo.png" alt="">
        <p>
            <span style="font-size: 18px">
                基于hyperf的快速优雅的应用开发框架
            </span>
            <br>
            <br>
            <span style="font-size: 16px; color: #999">
                MQCMS是一款现代化，快速，高效，灵活，前后端分离，扩展性强的CMS系统。
                MQCMS中的MQ取麻雀拼音首字母。寓意麻雀虽小五脏俱全。
            </span>
        </p>
        <p style="width: 450px; margin: 0 auto; margin-top: 30px; text-align: left">
            后端项目仓库：
            <i-link link-color="true" target="_blank" href="https://github.com/MQEnergy/MQCMS">https://github.com/MQEnergy/MQCMS</i-link>
            <br>
            前端项目仓库：
            <i-link link-color="true" target="_blank" href="https://github.com/MQEnergy/MQCMS-admin">https://github.com/MQEnergy/MQCMS-admin</i-link>
            <br>
            小程序项目仓库：
            <i-link link-color="true" target="_blank" href="https://github.com/MQEnergy/MQCMS-miniprogram">https://github.com/MQEnergy/MQCMS-miniprogram</i-link>
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
