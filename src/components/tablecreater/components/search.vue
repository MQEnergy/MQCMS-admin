<template>
    <div>
        <search-form
                ref="searchForm"
                :size="element.ele_size"
                :show-create="element.ele_attr.show_create"
                :show-refresh="element.ele_attr.show_refresh"
                :show-advanced="element.ele_attr.show_advanced"
                :show-export="element.ele_attr.show_export"
                :show-import="element.ele_attr.show_import"
                :show-multi-action="element.ele_attr.show_multi_action"
                :multi-actions="element.ele_attr.multi_actions"
                :base-search-form="element.ele_attr.base_search_form"
                :advanced-search-form="element.ele_attr.advanced_search_form"
                @on-create-form="handleOpenUpdateCreate"
                @on-search="handleData"
                @on-reset="handleData"
                @on-multi-del="handleMultiDel"
                @on-export="handleExport"
        />
    </div>
</template>

<script>
    import SearchForm from "@/components/searchform/index";
    import request from '@/plugins/request';

    export default {
        name: "component-search",
        props: {
            element: {
                type: Object,
                default: {}
            },
            index: {
                type: Number,
                default: 0
            },
            formConfig: {
                type: Object,
                default: {}
            }
        },
        components: {
            SearchForm
        },
        data () {
            return {
                searchForm: {},
                list: [],
                total: 0,
                loading: false
            }
        },
        methods: {
            // 编辑创建数据
            handleOpenUpdateCreate (status, updateIndex) {
                this.$emit('on-create-form', status, updateIndex);
            },
            handleData (searchForm) {
                this.searchForm = searchForm;
                this.loading = true;
                if (!this.element.ele_attr.search_action.value) {
                    this.$Message.error('请选择搜索url');
                    return false;
                }
                const currentActionValue = this.element.ele_attr.search_action.value.split('|');
                let requestJson = {
                    url: currentActionValue[1],
                    method: currentActionValue[2]
                };
                const requestData = {
                    page: this.formConfig.table.page,
                    limit: this.formConfig.table.limit,
                };
                if (currentActionValue[2] === 'get') {
                    requestJson.params = requestData;
                } else {
                    requestData.search = searchForm;
                    requestJson.data = requestData;
                }
                return request(requestJson).then(async res => {
                    this.list = res.data;
                    this.total = res.total;
                }).finally(() => {
                    this.loading = false;
                });
            },
            handleMultiDel () {
                if (this.selectedData.length === 0) {
                    this.$Message.error('请选择至少一个元素');
                    return false;
                }
                const ids = this.selectedData.map(item => item.id);
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确定要批量删除吗？',
                    onOk: () => {
                        this.$Message.success('删除成功: ' + ids);
                    }
                });
            },
            handleExport () {
                this.$Message.success('导出成功');
            }
        }
    }
</script>

<style scoped>

</style>