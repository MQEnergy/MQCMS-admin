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
            handleTabChange (t) {
                var e = this,
                  n = this.tabList.find(function(n) {
                      return (0, r.default)(this, e), n.name === t
                  }.bind(this));
                this.$emit("on-tab-change", JSON.parse((0, i.default)(n)))
            },
            handleBack () {
                this.$emit("on-back")
            }
        }
    }
</script>

<style scoped>

</style>