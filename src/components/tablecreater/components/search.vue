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
                @on-search="searchData"
                @on-reset="getData"
                @on-multi-del="handleMultiDel"
                @on-export="handleExport"
        />
    </div>
</template>

<script>
    import SearchForm from "@/components/searchform/index";
    import { TagIndex, TagSearch } from "@api/tag";

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
            }
        },
        methods: {
            // 编辑创建数据
            handleOpenUpdateCreate (status, updateIndex) {
                this.$emit('on-create-form', status, updateIndex);
            },
            getData () {
                this.loading = true;
                TagIndex({
                    page: this.current,
                    limit: this.size
                }).then(async res => {
                    this.list = res.data;
                    this.total = res.total;
                }).finally(() => {
                    this.loading = false;
                });
            },
            searchData (searchForm) {
                this.searchForm = searchForm;
                this.loading = true;
                TagSearch({
                    page: this.current,
                    limit: this.size,
                    search: searchForm
                }).then(async res => {
                    this.list = res.data;
                    this.total = res.total;
                }).finally(() => {
                    this.loading = false;
                });
            },
            handleMultiDel () {
                console.log(this.selectedData);
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