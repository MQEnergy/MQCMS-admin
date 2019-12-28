<template>
    <div class="i-table-no-border">
        <Button type="primary" icon="md-add" @click="handleOpenCreate">新建</Button>
        <Button icon="md-list" class="ivu-ml-8" v-show="selectedData.length">批量操作</Button>
        <Dropdown class="ivu-ml-8" v-show="selectedData.length" @on-click="handleClickItem">
            <Button>
                更多操作
                <Icon type="ios-arrow-down" />
            </Button>
            <DropdownMenu slot="list">
                <DropdownItem name="delete">删除</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Alert show-icon class="ivu-mt">
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
            <template slot-scope="{ row }" slot="label_type">
                <Tag v-if="row.label_type === '1'" color="default">单图</Tag>
                <Tag v-else-if="row.label_type === '2'" color="default">视频</Tag>
                <Tag v-else-if="row.label_type === '3'" color="default">多类别</Tag>
            </template>
            <template slot-scope="{ row }" slot="is_good">
                <Tag v-if="row.is_good === '1'" color="success">商品</Tag>
                <Tag v-else-if="row.is_good === '0'" color="default">正常</Tag>
            </template>
            <template slot-scope="{ row }" slot="is_publish">
                <Tag v-if="row.is_publish === '1'" color="success">已发布</Tag>
                <Tag v-else-if="row.is_publish === '0'" color="default">草稿</Tag>
            </template>
            <template slot-scope="{ row }" slot="is_recommend">
                <Tag v-if="row.is_recommend === '1'" color="error">推荐</Tag>
                <Tag v-else-if="row.is_recommend === '0'" color="default">正常</Tag>
            </template>
            <template slot-scope="{ row }" slot="status">
                <Badge v-if="row.status === '0'" status="default" text="禁用" />
                <Badge v-if="row.status === '1'" status="processing" text="正常" />
            </template>
            <template slot-scope="{ row }" slot="created_at">
                {{ row.created_at }}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <a @click="handleUpdate(index)">编辑</a>
            </template>
        </Table>
        <div class="ivu-mt ivu-text-center">
            <Page :total="total" show-total :current.sync="current" @on-change="handleChange"/>
        </div>
        <!-- 详情 编辑 新增 -->
        <Drawer
            title="发布编辑帖子"
            v-model="createSeen"
            width="720"
            :mask-closable="false"
            :styles="styles">
            <detail :info="currentItem" @on-cancel="handleDetailSeen" @on-ok="getData" />
        </Drawer>
    </div>
</template>
<script>
    import { PostIndex } from '@/api/post';
    import Detail from './detail';

    export default {
        components: {
            Detail
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
                        title: '发布者',
                        key: 'user_name',
                        minWidth: 100
                    },
                    {
                        title: '资源类型',
                        slot: 'label_type',
                        key: 'label_type',
                        minWidth: 100
                    },
                    {
                        title: '是否商品',
                        slot: 'is_good',
                        key: 'is_good',
                        minWidth: 100
                    },
                    {
                        title: '是否发布',
                        slot: 'is_publish',
                        key: 'is_publish',
                        minWidth: 100
                    },
                    {
                        title: '是否推荐',
                        slot: 'is_recommend',
                        key: 'is_recommend',
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
                        minWidth: 140
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
                createSeen: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                }
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
                this.handleDetailSeen();
                this.loading = true;
                PostIndex({
                    page: this.current,
                    limit: this.size
                }).then(async res => {
                    this.list = res.data;
                    this.list.forEach((val, key) => {
                       val.label_type  = val.label_type ? val.label_type.toString() : '1';
                       val.is_good  = val.is_good ? val.is_good.toString() : '0';
                       val.is_publish  = val.is_publish ? val.is_publish.toString() : '0';
                       val.is_recommend  = val.is_recommend ? val.is_recommend.toString() : '0';
                       val.status  = val.status ? val.status.toString() : '1';
                    });
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
            handleClickItem (name) {
                if (name === 'delete') {
                    this.selectedData.forEach(item => {
                        const index = this.list.findIndex(i => i.id === item.id);
                        if (index >= 0) {
                            this.list.splice(index, 1);
                        }
                    });
                    this.selectedData = [];
                }
            },
            handleOpenCreate () {
                this.currentItem = {};
                this.createSeen = true;
            },
            handleUpdate (index) {
                this.currentItem  = this.list[index];
                this.createSeen = true;
            },
            handleChange (page) {
                this.current = page;
                this.getData();
            },
            handleSwitchChange (status) {
                this.createData.status = status ? 1 : 0;
                this.createData.statusFormat = status;
            },
            handleDetailSeen () {
                this.createSeen = false;
            }
        }
    }
</script>
