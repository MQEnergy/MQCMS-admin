<template>
    <div>
        <!-- 搜索 -->
        <search-form
            ref="searchForm"
            :show-multi-action="false"
            :show-export="false"
            :show-advanced="true"
            :show-search="false"
            @on-create-form="handleOpenUpdateCreate"
            @on-reset="getData"
            @on-search="getData"
        />
        <Table
            border
            ref="table"
            row-key="id"
            :columns="columns"
            :data="list"
            :loading="loading"
            class="ivu-mt"
            @on-sort-change="handleSortChange"
            @on-filter-change="handleFilterChange"
            @on-select="handleSelect"
            @on-select-cancel="handleSelectCancel"
            @on-select-all="handleSelectAll"
            @on-select-all-cancel="handleSelectAllCancel"
        >
            <template slot-scope="{ row }" slot="menu_type">
                <Tag v-if="row.menu_type == 1" color="success">模块</Tag>
                <Tag v-if="row.menu_type == 2" color="warning">操作</Tag>
            </template>
            <template slot-scope="{ row }" slot="status">
                <Badge v-if="row.status == 0" status="default" text="禁用" />
                <Badge v-if="row.status == 1" status="processing" text="正常" />
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <template v-if="row.menu_type == 1">
                    <a @click="handleMenuOpenUpdateCreate(true, -1)">添加操作</a>
                    <Divider type="vertical" />
                    <a @click="handleOpenUpdateCreate(true, row.id)">编辑</a>
                    <Divider type="vertical" />
                </template>
                <template v-else>
                    <a @click="handleMenuOpenUpdateCreate(true, row.id)">编辑</a>
                    <Divider type="vertical" />
                </template>
                <a @click="handleDelete(index)">删除</a>
            </template>
        </Table>
        <div class="ivu-mt ivu-text-center">
            <Page :total="total" show-total :current.sync="current" @on-change="handleChange"/>
        </div>
        <!-- 创建编辑 -->
        <create-form ref="createForm" @on-create-form="handleOpenUpdateCreate" @on-ok="getData" />
        <create-action-form ref="createActionForm" @on-create-form="handleOpenUpdateCreate" @on-ok="getData" />
    </div>
</template>
<script>
import { MenuIndex, MenuDelete } from '@/api/permission/menu';
import searchForm from '@/components/searchform';
import createForm from './create-form';
import CreateActionForm from "./create-action-form";

export default {
    components: {
        CreateActionForm,
        searchForm,
        createForm,
    },
    data () {
        return {
            columns: [
                {
                    title: 'ID',
                    key: 'id',
                    minWidth: 80
                },
                {
                    title: '名称',
                    key: 'title',
                    minWidth: 100,
                    tree: true
                },
                {
                    title: '别名',
                    key: 'alias_title',
                    minWidth: 100
                },
                {
                    title: '描述',
                    key: 'desc',
                    minWidth: 100
                },
                {
                    title: '菜单类型',
                    key: 'menu_type',
                    slot: 'menu_type',
                    minWidth: 100
                },
                {
                    title: '控制器',
                    key: 'backend_url',
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
                    fixed: 'right',
                    minWidth: 200
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
            filterType: undefined,
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

            // 动态计算过滤类型
            if (this.filterType && this.filterType.length) {
                data = data.filter(item => {
                    return this.filterType.indexOf(item.status) >= 0;
                });
            }

            // 判断是否有选中的数据
            const selectedNames = this.selectedData.map(item => item.user_name);
            data.map(item => {
                item._checked = selectedNames.indexOf(item.user_name) >= 0;
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
            MenuIndex({
                page: this.current,
                limit: this.size
            }).then(async res => {
                this.list = res;
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
        handleClickItem (name) {
            if (name === 'delete') {
                this.$Modal.confirm({
                    title: '删除标签',
                    content: '确定批量删除标签吗？',
                    onOk: () => {
                        this.selectedData.forEach(item => {
                            const index = this.list.findIndex(i => i.id === item.id);
                            if (index >= 0) {
                                this.list.splice(index, 1);
                            }
                        });
                        this.selectedData = [];
                    }
                });
            }
        },
        // 编辑创建数据
        handleOpenUpdateCreate (status, updateIndex) {
            this.$refs.createForm.handleShowUpdateCreate(status, updateIndex);
        },
        handleMenuOpenUpdateCreate (status, updateIndex) {
            this.$refs.createActionForm.handleShowUpdateCreate(status, updateIndex);
        },
        handleShow (row, index) {
            console.log(row, index);
        },
        handleDelete (index) {
            this.updateIndex = index;
            this.$Modal.confirm({
                title: '删除提示',
                content: '确定删除吗？',
                onOk: () => {
                    MenuDelete({
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
        handleChange (page) {
            this.current = page;
            this.getData();
        }
    }
}
</script>
