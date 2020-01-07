<template>
    <div class="i-table-no-border">
        <!-- 搜索 -->
        <search-form
            ref="searchForm"
            :show-multi-del="false"
            :base-search-form="baseSeachForm"
            :advanced-search-form="advancedSearchForm"
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
            <template slot-scope="{ row }" slot="tag_name">
                <div>
                    <Poptip trigger="hover">
                        <Icon v-color="'#ff9900'" style="color: #666; cursor: pointer;" type="ios-information-circle" />
                        <div slot="content" style="padding: 10px;">
                            <p><span v-color="'#999'">标题(SEO)：</span>{{ row.tag_title || '无' }}</p>
                            <p><span v-color="'#999'">描述(SEO)：</span>{{ row.tag_desc || '无' }}</p>
                            <p><span v-color="'#999'">关键词(SEO)：</span>{{ row.tag_keyword || '无' }}</p>
                        </div>
                    </Poptip>
                    {{ row.tag_name }}
                </div>
            </template>
            <template slot-scope="{ row }" slot="is_hot">
                <Tag v-if="row.is_hot === 0" color="primary">正常</Tag>
                <Tag v-else color="error">热门</Tag>
            </template>
            <template slot-scope="{ row }" slot="tag_type">
                <Tag v-if="row.tag_type === 1" color="primary">系统创建</Tag>
                <Tag v-else color="success">用户创建</Tag>
            </template>
            <template slot-scope="{ row }" slot="status">
                <Badge v-if="row.status === 0" status="default" text="禁用" />
                <Badge v-else status="processing" text="正常" />
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <a @click="handleOpenUpdateCreate(true, row.id)">编辑</a>
                <Divider type="vertical" />
                <a @click="handleDelete(index)">删除</a>
            </template>
        </Table>
        <div class="ivu-mt ivu-text-center">
            <Page :total="total" show-total :current.sync="current" @on-change="handleChange"/>
        </div>
        <!-- 创建编辑 -->
        <create-form ref="createForm" @on-create-form="handleOpenUpdateCreate" @on-ok="getData" />
    </div>
</template>
<script>
    import { TagSearch, TagIndex, TagDelete } from '@/api/tag';
    import createForm from './create-form';
    import searchForm from '@/components/searchform/index';
    
    export default {
        components: {
            searchForm,
            createForm
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
                        title: '标签名称',
                        slot: 'tag_name',
                        key: 'tag_name',
                        minWidth: 100
                    },
                    {
                        title: '使用次数',
                        key: 'used_count',
                        minWidth: 100
                    },
                    {
                        title: '是否热门',
                        slot: 'is_hot',
                        minWidth: 100,
                        filters: [
                            {
                                label: '正常',
                                value: 0
                            },
                            {
                                label: '热门',
                                value: 1
                            }
                        ],
                        filterMultiple: true,
                        filterRemote (value) {
                            // 切换过滤条件时，将条件保存到本地
                            this.filterHotType = value;
                        }
                    },
                    {
                        title: '标签类型',
                        slot: 'tag_type',
                        minWidth: 100,
                        filters: [
                            {
                                label: '系统创建',
                                value: 1
                            },
                            {
                                label: '用户创建',
                                value: 2
                            }
                        ],
                        filterMultiple: true,
                        filterRemote (value) {
                            // 切换过滤条件时，将条件保存到本地
                            this.filterTagType = value;
                        }
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
                            this.filterStatusType = value;
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
                baseSeachForm: {
                    type: 'id',
                    keyword: '',
                    options: [
                        {
                            name: '标签ID',
                            value: 'id'
                        },
                        {
                            name: '标签名称',
                            value: 'tag_name'
                        },
                        {
                            name: '标签标题(SEO)',
                            value: 'tag_title'
                        }
                    ]
                },
                advancedSearchForm: [
                    {
                        label_name: '是否热门：',
                        label_prop: 'is_hot',
                        ele_value: '',
                        ele_type: 'select',
                        options: [
                            {
                                value: '0',
                                name: '正常'
                            },
                            {
                                value: '1',
                                name: '热门'
                            }
                        ],
                    },
                    {
                        label_name: '标签类型：',
                        label_prop: 'tag_type',
                        ele_value: '',
                        ele_type: 'select',
                        options: [
                            {
                                value: '1',
                                name: '系统创建'
                            },
                            {
                                value: '2',
                                name: '用户创建'
                            }
                        ],
                    },
                    {
                        label_name: '标签名称：',
                        label_prop: 'tag_name',
                        ele_value: '',
                        ele_type: 'input',
                        options: []
                    },
                    {
                        label_name: '创建时间：',
                        label_prop: 'created_at',
                        ele_value: '',
                        ele_type: 'daterange',
                        options: {}
                    },
                    {
                        label_name: '更新时间：',
                        label_prop: 'updated_at',
                        ele_value: '',
                        ele_type: 'datetimerange',
                        options: {}
                    },
                    {
                        label_name: '标签状态：',
                        label_prop: 'status',
                        ele_value: '1',
                        ele_type: 'switch',
                        options: {
                            open: '开',
                            true_value: '1',
                            close: '关',
                            false_value: '0'
                        }
                    },
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
                    title: '删除标签',
                    content: '确定删除该标签吗？',
                    onOk: () => {
                        TagDelete({
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
                console.log(this.selectedData)
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
<style scoped>
    .ivu-table-wrapper {
        overflow: visible;
    }
</style>
