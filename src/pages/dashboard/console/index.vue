<template>
    <div style="padding-top: 16px;" v-resize="handleResize">
        <base-info ref="baseInfo" />
        <grid-menu />
        <Card :bordered="false" dis-hover class="dashboard-console-visit">
            <div slot="title">
                <Row type="flex" justify="center" align="middle">
                    <Col span="8">
                        <Avatar icon="ios-podium" size="small" v-color="'#1890ff'" v-bg-color="'#e6f7ff'" />
                        <span class="ivu-pl-8">访问量</span>
                    </Col>
                    <Col span="16" class="ivu-text-right">
                        <RadioGroup v-model="visitType" type="button" class="ivu-mr-8" @on-change="handleChangeVisitType">
                            <Radio label="day">今日</Radio>
                            <Radio label="month">本月</Radio>
                            <Radio label="year">全年</Radio>
                        </RadioGroup>
                        <DatePicker v-model="visitDate" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                    </Col>
                </Row>
            </div>
            <div>
                <visit-chart ref="visitChart" />
            </div>
        </Card>
        <Row :gutter="24" class="ivu-mt">
            <Col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" class="ivu-mb">
                <Card :bordered="false" dis-hover v-height="480">
                    <div slot="title">
                        <Avatar icon="ios-search" size="small" v-color="'#722ed1'" v-bg-color="'#f9f0ff'" />
                        <span class="ivu-pl-8">热门搜索</span>
                    </div>
                    <div slot="extra">
                        <Dropdown>
                            <Icon type="md-more" />
                            <DropdownMenu slot="list">
                                <DropdownItem>操作一</DropdownItem>
                                <DropdownItem>操作二</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <hot-search ref="hotSearch" />
                </Card>
            </Col>
            <Col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" class="ivu-mb">
                <Card :bordered="false" dis-hover v-height="480">
                    <div slot="title">
                        <Avatar icon="ios-people" size="small" v-color="'#faad14'" v-bg-color="'#fffbe6'" />
                        <span class="ivu-pl-8">用户画像</span>
                    </div>
                    <div slot="extra">
                        <Tooltip placement="top" content="下载数据">
                            <Icon type="ios-download-outline" />
                        </Tooltip>
                    </div>
                    <user-preference />
                </Card>
            </Col>
        </Row>
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
