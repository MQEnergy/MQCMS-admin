<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="商品列表" content="以卡片的形式展现商品或图片信息。" hidden-breadcrumb />
        </div>
        <div class="ivu-mt">
            <div style="position: relative;height: 100px;" v-if="loading">
                <Spin fix size="large"></Spin>
            </div>
            <Row :gutter="24">
                <Col v-for="(item, index) in data" :key="index" :xxl="6" :xl="8" :lg="8" :md="12" :sm="24" :xs="24" class="ivu-mb">
                    <i-link :to="item.link" target="_blank">
                        <Card :bordered="false" class="list-goods-list-item">
                            <Tag color="green" v-if="item.is_recommend">推荐</Tag>
                            <Tag color="red" v-if="item.status === 2">缺货</Tag>
                            <img :src="item.cover" alt="cover">
                            <div class="list-goods-list-item-title">{{ item.title }}</div>
                            <div class="list-goods-list-item-desc">{{ item.desc }}</div>
                            <div class="list-goods-list-item-price">
                                <span>¥ {{ item.price }} 元</span>
                                <s v-if="item.old_price"> ¥ {{ item.old_price }} 元</s>
                            </div>
                        </Card>
                    </i-link>
                </Col>
            </Row>
            <div class="ivu-mt ivu-text-center" slot="footer">
                <Page :total="100" show-elevator show-sizer show-total :simple="isMobile" />
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import listData from './data';

    export default {
        name: 'list-goods-list',
        data () {
            return {
                data: [],
                loading: false
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile'
            ])
        },
        methods: {
            getData () {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.data = listData;
                }, 1000);
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>
<style lang="less">
    .list-goods-list{
        &-item{
            text-align: center;
            position: relative;
            img{
                width: 60%;
            }
            .ivu-tag{
                position: absolute;
                top: 10px;
                right: 10px;
            }
            &-title{
                font-size: 16px;
                font-weight: bold;
                margin: 8px 0;
            }
            &-desc{
                font-size: 14px;
                color: #808695;
            }
            &-price{
                font-size: 14px;
                color: #ff6700;
                margin: 8px 0;
                s{
                    color: #c5c8ce;
                }
            }
        }
    }
</style>
