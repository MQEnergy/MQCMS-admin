<template>
    <div class="ivu-page-header">
        <div class="ivu-page-header-detail">
            <div v-if="back" class="ivu-page-header-back" @click="handleBack">
                <i class="ivu-icon ivu-icon-md-arrow-back"></i>
                <div class="ivu-divider ivu-divider-vertical ivu-divider-default"></div>
            </div>
            <div class="ivu-page-header-main">
                <div class="ivu-page-header-row">
                    <div class="ivu-page-header-title">{{ title }}</div>
                </div>
                <div v-if="content" class="ivu-page-header-row">
                    <div class="ivu-page-header-content">{{ content }}</div>
                </div>
            </div>
        </div>
        <div class="ivu-page-header-tabs" v-if="tabList.length > 0">
            <Tabs @on-click="handleTabChange" :value="tabActiveKey">
                <TabPane v-for="(item, index) in tabList" :key="index" :name="item.name" :label="item.label"></TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageHeader',
        props: {
            title: {
                type: String
            },
            back: {
                type: Boolean,
                default: !1
            },
            logo: {
                type: String
            },
            action: {
                type: String
            },
            content: {
                type: String
            },
            extra: {
                type: String
            },
            breadcrumbList: {
                type: Array
            },
            hiddenBreadcrumb: {
                type: Boolean,
                default: !1
            },
            tabList: {
                type: Array
            },
            tabActiveKey: {
                type: String
            },
            wide: {
                type: Boolean,
                default: !1
            }
        },
        computed: {
            classes: function() {
                return {
                    "ivu-page-header-wide": this.wide
                }
            }
        },
        methods: {
            handleTabChange (name) {
                this.$emit("on-tab-change", name);
            },
            handleBack () {
                this.$emit("on-back")
            }
        }
    }
</script>

<style scoped>

</style>