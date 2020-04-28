<template>
    <div>
        <!-- 搜索 -->
        <search-form
            ref="searchForm"
            :show-multi-action="false"
            :base-search-form="baseSearchForm"
            :advanced-search-form="advancedSearchForm"
            :show-advanced="true"
            @on-create-form="handleOpenUpdateCreate"
            @on-search="searchData"
            @on-reset="getData"
            @on-multi-del="handleMultiDel"
            @on-export="handleExport"
        />
        <!-- 列表 -->
        <Alert show-icon>
            <div v-font="14">
                已选择 <strong v-color="'#2d8cf0'">{{ selectedData.length }}</strong> 项
                <a class="ivu-ml" @click="handleClearSelect">清空</a>
            </div>
        </Alert>
        <Table
            border
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
            <template slot-scope="{ row }" slot="seo_title">
                <p><span v-color="'#999'">标题：</span>{{ row.seo_title || '无' }}</p>
                <p><span v-color="'#999'">描述：</span>{{ row.seo_desc || '无' }}</p>
                <p><span v-color="'#999'">关键词：</span>{{ row.seo_keyword || '无' }}</p>
            </template>
            <template slot-scope="{ row }" slot="status">
                <Badge v-if="row.status == 0" status="default" text="禁用" />
                <Badge v-if="row.status == 1" status="processing" text="正常" />
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <a @click="handleOpenUpdateCreate(true, row.id)">编辑</a>
                <Divider type="vertical" />
                <a v-color="'#ed4014'" @click="handleDelete(index)">删除</a>
            </template>
        </Table>
        <div class="ivu-mt ivu-text-center">
<!--            <Page :total="total" show-total :current.sync="current" @on-change="handleChange"/>-->
        </div>
        <!-- 详情 编辑 新增 -->
        <create-form ref="createForm" @on-create-form="handleOpenUpdateCreate" @on-ok="getData" />
    </div>
</template>
<script>
    import { CategorySearch, CategoryIndex, CategoryDelete } from '@api/category';
    import CreateForm from './create-form';
    import SearchForm from '@/components/searchform/index';
    
    export default {
        components: {
            CreateForm,
            SearchForm
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
                        title: 'ID',
                        key: 'id',
                        minWidth: 80
                    },
                    {
                        title: '分类名称',
                        key: 'cate_name',
                        minWidth: 100
                    },
                    {
                        title: '分类别名',
                        key: 'alias_name',
                        minWidth: 100
                    },
                    {
                        title: '分类描述',
                        key: 'cate_desc',
                        minWidth: 100
                    },
                    {
                        title: 'seo参数',
                        slot: 'seo_title',
                        key: 'seo_title',
                        minWidth: 100
                    },
                    {
                        title: '排序',
                        key: 'sort_order',
                        minWidth: 100
                    },
                    {
                        title: '状态',
                        slot: 'status',
                        minWidth: 100,
                        filters: [
                            {
                                label: '禁用',
                                value: 0
                            },
                            {
                                label: '正常',
                                value: 1
                            }
                        ],
                        filterMultiple: true,
                        filterRemote (value) {
                            // 切换过滤条件时，将条件保存到本地
                            this.filterType = value;
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'created_at',
                        minWidth: 140,
                        sortable: 'custom'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        align: 'center',
                        minWidth: 140,
                        fixed: 'right',
                    }
                ],
                loading: false,
                list: [],
                selectedData: [],
                currentItem: {},
                current: 1,
                total: 0,
                size: 10,
                sortType: 'normal', // 当前排序类型，可选值为：normal（默认） || asc（升序）|| desc（降序）,
                sortColumns: '',
                filterType: undefined,
                searchForm: {},
                baseSearchForm: {
                    type: 'id',
                    keyword: '',
                    options: [
                        {
                            name: 'ID',
                            value: 'id'
                        },
                        {
                            name: '分类名称',
                            value: 'cate_name'
                        },
                        {
                            name: '分类别名',
                            value: 'alias_name'
                        }
                    ]
                },
                advancedSearchForm: [
                    {
                        label_name: '创建时间：',
                        label_prop: 'created_at',
                        ele_value: '',
                        ele_type: 'daterange',
                        options: {}
                    },
                    {
                        label_name: '状态：',
                        label_prop: 'status',
                        ele_value: '',
                        ele_type: 'select',
                        options: [
                            {
                                value: '1',
                                name: '是'
                            },
                            {
                                value: '0',
                                name: '否'
                            }
                        ],
                    }
                ]
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

                // 动态计算过滤类型
                if (this.filterType && this.filterType.length) {
                    data = data.filter(item => {
                        return this.filterType.indexOf(item.status) >= 0;
                    });
                }

                // 判断是否有选中的数据
                const selectedNames = this.selectedData.map(item => item.id);
                data.map(item => {
                    item._checked = selectedNames.indexOf(item.id) >= 0;
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
            getData () {
                this.loading = true;
                CategoryIndex({
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
                CategorySearch({
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
            // 选中一项，将数据添加至已选项中
            handleSelect (selection, row) {
                this.selectedData.push(row);
            },
            // 取消选中一项，将取消的数据从已选项中删除
            handleSelectCancel (selection, row) {
                const index = this.selectedData.findIndex(item => item.id === row.id);
                this.selectedData.splice(index, 1);
            },
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
            // 清空所有已选项
            handleClearSelect () {
                this.selectedData = [];
            },
            // 编辑创建数据
            handleOpenUpdateCreate (status, updateIndex) {
                this.$refs.createForm.handleShowUpdateCreate(status, updateIndex);
            },
            handleDelete (index) {
                this.updateIndex = index;
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '确定删除该条记录吗？',
                    onOk: () => {
                        CategoryDelete({
                            id: this.list[index].id
                        }).then(res => {
                            this.$Message.success('删除成功');
                            this.current = 1;
                            this.getData();
                        }).finally(() => {
                        });
                    }
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
            handleChange (page) {
                this.current = page;
                if (this.searchForm) {
                    this.searchData(this.searchForm);
                } else {
                    this.getData();
                }
            },
            handleExport () {
                this.$Message.success('导出成功');
            }
        }
    }
</script>
