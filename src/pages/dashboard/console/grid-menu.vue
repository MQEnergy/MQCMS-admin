<template>
    <Row :gutter="24" class="dashboard-console-grid">
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false">
                <a href="javascript:void(0)">
                    <Icon type="md-people" color="#69c0ff" />
                    <p>用户</p>
                </a>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false">
                <a href="javascript:void(0)">
                    <Icon type="md-podium" color="#95de64" />
                    <p>分析</p>
                </a>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false">
                <a href="javascript:void(0)">
                    <Icon type="md-cart" color="#ff9c6e" />
                    <p>商品</p>
                </a>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false">
                <a href="javascript:void(0)">
                    <Icon type="md-clipboard" color="#b37feb" />
                    <p>订单</p>
                </a>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false">
                <a href="javascript:void(0)">
                    <Icon type="md-card" color="#ffd666" />
                    <p>票据</p>
                </a>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false">
                <a href="javascript:void(0)">
                    <Icon type="md-mail" color="#5cdbd3" />
                    <p>消息</p>
                </a>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false">
                <a href="javascript:void(0)">
                    <Icon type="md-pricetags" color="#ff85c0" />
                    <p>标签</p>
                </a>
            </Card>
        </Col>
        <Col v-bind="grid" class="ivu-mb">
            <Card :bordered="false">
                <a href="javascript:void(0)">
                    <Icon type="md-switch" color="#ffc069" />
                    <p>配置</p>
                </a>
            </Card>
        </Col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                grid: {
                    xl: 3,
                    lg: 4,
                    md: 8,
                    sm: 8,
                    xs: 8
                }
            }
        }
    }
</script>
<style lang="less">
    .dashboard-console-grid{
        text-align: center;
        .ivu-card-body{
            padding: 0;
        }
        i{
            font-size: 32px;
        }
        a{
            display: block;
            color: inherit;
            padding: 16px;
        }
        p{
            margin-top: 8px;
        }
    }
</style>
