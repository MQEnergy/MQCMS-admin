<template>
    <div>
        <Table
                ref="table"
                :columns="columns"
                :data="limitData"
                :loading="loading"
                class="ivu-mt"
                @on-sort-change="handleSortChange"
                @on-filter-change="handleFilterChange"
                @on-select="handleSelect"
                @on-select-cancel="handleSelectCancel"
                @on-select-all="handleSelectAll"
                @on-select-all-cancel="handleSelectAllCancel"
        >
        </Table>
    </div>
</template>

<script>
    export default {
        name: "component-table",
        props: {
        },
        data () {
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        minWidth: 140
                    }
                ],
                loading: false,
                list: [],
                selectedData: [],
                current: 1,
                total: 0,
                size: 10,
                sortType: 'normal', // 当前排序类型，可选值为：normal（默认） || asc（升序）|| desc（降序）,
                sortColumns: '',
                filterStatusType: undefined,
                filterHotType: undefined,
                filterTagType: undefined,
                searchForm: {},

            }
        },
        computed: {
            limitData () {
                let data = [...this.list];

                // 动态计算排序类型
                const sortColumns = this.sortColumns;
                if (this.sortType === 'asc') {
                    data = data.sort((a, b) => {
                        return a[sortColumns] > b[sortColumns] ? 1 : -1;
                    });
                }
                if (this.sortType === 'desc') {
                    data = data.sort((a, b) => {
                        return a[sortColumns] < b[sortColumns] ? 1 : -1;
                    });
                }
                // 状态动态计算过滤类型
                if (this.filterStatusType && this.filterStatusType.length) {
                    data = data.filter(item => {
                        return this.filterStatusType.indexOf(item.status) >= 0;
                    });
                }
                // 是否热门动态计算过滤类型
                if (this.filterHotType && this.filterHotType.length) {
                    data = data.filter(item => {
                        return this.filterHotType.indexOf(item.is_hot) >= 0;
                    });
                }
                // 标签类型动态计算过滤类型
                if (this.filterTagType && this.filterTagType.length) {
                    data = data.filter(item => {
                        return this.filterTagType.indexOf(item.tag_type) >= 0;
                    });
                }
                // 判断是否有选中的数据
                const selectedNames = this.selectedData.map(item => item.tag_name);
                data.map(item => {
                    item._checked = selectedNames.indexOf(item.tag_name) >= 0;
                    return item;
                });
                return data;
            },
            // 因为要动态计算总页数，所以还需要一个计算属性来返回最终给 Table 的 data
            dataWithPage () {
                const data = this.limitData;
                const start = this.current * this.size - this.size;
                const end = start + this.size;
                return [...data].slice(start, end);
            }
        },
        methods: {
            // 选中一项，将数据添加至已选项中
            handleSelect (selection, row) {
                this.selectedData.push(row);
            },
            // 点击排序按钮时触发
            handleSortChange ({ key, order }) {
                // 将排序保存到数据
                this.sortColumns = key;
                this.sortType = order;
                this.current = 1;
            },
            // 过滤条件改变时触发
            handleFilterChange () {
                // 从第一页开始
                this.current = 1;
            },
            // 取消选中一项，将取消的数据从已选项中删除
            handleSelectCancel (selection, row) {
                const index = this.selectedData.findIndex(item => item.id === row.id);
                this.selectedData.splice(index, 1);
            },
            // 当前页全选时，判断已选数据是否存在，不存在则添加
            handleSelectAll (selection) {
                selection.forEach(item => {
                    if (this.selectedData.findIndex(i => i.id === item.id) < 0) {
                        this.selectedData.push(item);
                    }
                });
            },
            // 取消当前页全选时，将当前页的数据（即 dataWithPage）从已选项中删除
            handleSelectAllCancel () {
                const selection = this.dataWithPage;
                selection.forEach(item => {
                    const index = this.selectedData.findIndex(i => i.id === item.id);
                    if (index >= 0) {
                        this.selectedData.splice(index, 1);
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>