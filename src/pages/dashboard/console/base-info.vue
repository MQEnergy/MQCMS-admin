<template>
    <Row :gutter="24">
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false" dis-hover :padding="12">
                <p slot="title">
                    <span>访问量</span>
                </p>
                <Tag slot="extra" color="green">日</Tag>
                <div>
                    <Numeral value="25848" format="0,0" v-font="30" />
                    <div class="ivu-pt-8" v-height="42">
                        <span v-display="'inline-block'" class="ivu-mr">
                            日同比 <Trend flag="up">12.5%</Trend>
                        </span>
                        <span v-display="'inline-block'">
                            周同比 <Trend flag="down">5%</Trend>
                        </span>
                    </div>
                    <Divider style="margin: 8px 0" />
                    <div>
                        <Row>
                            <Col span="12">总访问量</Col>
                            <Col span="12" class="ivu-text-right">280 万</Col>
                        </Row>
                    </div>
                </div>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false" dis-hover :padding="12">
                <p slot="title">
                    <span>销售额</span>
                </p>
                <Tag slot="extra" color="blue">月</Tag>
                <div>
                    <Numeral value="12000" format="0,0" prefix="¥" v-font="30" />
                    <div class="ivu-pt-8" v-height="42">
                        <Tooltip content="60% 已达标" style="width: 100%">
                            <Progress :percent="60" hide-info />
                        </Tooltip>
                    </div>
                    <Divider style="margin: 8px 0" />
                    <div>
                        <Row>
                            <Col span="12">总销售额</Col>
                            <Col span="12" class="ivu-text-right">68 万</Col>
                        </Row>
                    </div>
                </div>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false" dis-hover :padding="12">
                <p slot="title">
                    <span>订单量</span>
                </p>
                <Tag slot="extra" color="red">周</Tag>
                <div>
                    <Numeral value="1680" format="0,0" v-font="30" />
                    <div class="ivu-pt-8" v-height="42" ref="orderChart"></div>
                    <Divider style="margin: 8px 0" />
                    <div>
                        <Row>
                            <Col span="12">转化率</Col>
                            <Col span="12" class="ivu-text-right">60%</Col>
                        </Row>
                    </div>
                </div>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false" dis-hover :padding="12">
                <p slot="title">
                    <span>新增用户</span>
                </p>
                <Tooltip slot="extra" content="指标说明" placement="top">
                    <Icon type="ios-help-circle-outline" />
                </Tooltip>
                <div>
                    <Numeral value="128" format="0,0" v-font="30">
                        <span slot="suffix" v-font="24"> 位</span>
                    </Numeral>
                    <div class="ivu-pt-8" v-height="42">
                        <AvatarList size="small" :list="avatarList" :max="7" :excess-style="excessStyle" />
                    </div>
                    <Divider style="margin: 8px 0" />
                    <div>
                        <Row>
                            <Col span="12">总用户</Col>
                            <Col span="12" class="ivu-text-right">10800 人</Col>
                        </Row>
                    </div>
                </div>
            </Card>
        </Col>
    </Row>
</template>
<script>
    import echarts from 'echarts';

    export default {
        data () {
            return {
                grid: {
                    xl: 6,
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 24
                },
                excessStyle: {
                    color: '#f56a00',
                    backgroundColor: '#fde3cf'
                },
                avatarList: [
                    {
                        src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
                        tip: '史蒂夫·乔布斯'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
                        tip: '斯蒂夫·沃兹尼亚克'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
                        tip: '乔纳森·伊夫'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
                        tip: '蒂姆·库克'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
                        tip: '比尔·费尔南德斯'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
                        tip: '史蒂夫·乔布斯'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/zhj85zgAfEjChCNIKT1LQENUIOyOYCaX/avatar',
                        tip: '斯蒂夫·沃兹尼亚克'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/TkH54UozsINlex15TAMI00GElsfsKSiC/avatar',
                        tip: '乔纳森·伊夫'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/xrzbBR99F6tYsDJPLNrvwhllowbuL7Gw/avatar',
                        tip: '蒂姆·库克'
                    },
                    {
                        src: 'https://dev-file.iviewui.com/bgrngoUb9A6UQ2kAwBFtnSNzhrh2qj1O/avatar',
                        tip: '比尔·费尔南德斯'
                    }
                ]
            }
        },
        methods: {
            handleSetOrderChart () {
                this.orderChart = echarts.init(this.$refs.orderChart);
                this.orderChart.setOption(
                    {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            show: false
                        },
                        yAxis: {
                            type: 'value',
                            show: false
                        },
                        series: [{
                            data: [10, 300, 150, 450, 70, 210, 130],
                            type: 'line',
                            tooltip: true,
                            smooth: true,
                            symbol: 'none',
                            areaStyle: {
                                normal: {
                                    opacity: 0.3
                                }
                            }
                        }],
                        color: '#00CC66',
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: -60,
                            right: -20,
                            bottom: -20,
                            top: 4,
                            containLabel: true
                        }
                    }
                );
            },
            handleResize () {
                if (this.orderChart) this.orderChart.resize();
            }
        },
        mounted () {
            this.handleSetOrderChart();
        },
        beforeDestroy () {
            if (this.orderChart) {
                this.orderChart.dispose();
                this.orderChart = null;
            }
        }
    }
</script>
