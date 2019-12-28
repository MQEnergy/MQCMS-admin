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
                <DropdownItem name="approve">批量审批</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Alert show-icon class="ivu-mt">
            <div v-font="14">
                已选择 <strong v-color="'#2d8cf0'">{{ selectedData.length }}</strong> 项 服务调用次数总计 <strong>{{ totalSelectedCount }} 万</strong>
                <a class="ivu-ml" @click="handleClearSelect">清空</a>
            </div>
        </Alert>
        <Table
            ref="table"
            :columns="columns"
            :data="dataWithPage"
            :loading="loading"
            class="ivu-mt"
            @on-sort-change="handleSortChange"
            @on-filter-change="handleFilterChange"
            @on-select="handleSelect"
            @on-select-cancel="handleSelectCancel"
            @on-select-all="handleSelectAll"
            @on-select-all-cancel="handleSelectAllCancel"
        >
            <template slot-scope="{ row }" slot="count">
                <div>{{ row.count }} 万</div>
            </template>
            <template slot-scope="{ row }" slot="status">
                <Badge v-if="row.status === 0" status="default" text="关闭" />
                <Badge v-if="row.status === 1" status="processing" text="运行中" />
                <Badge v-if="row.status === 2" status="success" text="已上线" />
                <Badge v-if="row.status === 3" status="error" text="异常" />
            </template>
            <template slot-scope="{ row }" slot="date">
                {{ row.date | date_format('YYYY-MM-DD HH:mm:ss') }}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <a @click="handleUpdate(index)">编辑</a>
                <Divider type="vertical" />
                <a>订阅警报</a>
            </template>
        </Table>
        <div class="ivu-mt ivu-text-center">
            <Page :total="limitData.length" :current.sync="current" />
        </div>

        <Modal v-model="showCreate" title="编辑规则" :loading="creating" @on-ok="handleCreate">
            <Form ref="create" :model="createData" :rules="createRules" :label-width="80">
                <FormItem label="描述：" prop="desc">
                    <Input v-model="createData.desc" placeholder="请输入" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import random from '@/libs/random_str';

    export default {
        data () {
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '规则名称',
                        key: 'name',
                        minWidth: 100
                    },
                    {
                        title: '描述',
                        key: 'desc',
                        minWidth: 100
                    },
                    {
                        title: '服务调用次数',
                        key: 'count',
                        slot: 'count',
                        align: 'right',
                        minWidth: 140,
                        sortable: 'custom'
                    },
                    {
                        title: '状态',
                        slot: 'status',
                        minWidth: 100,
                        filters: [
                            {
                                label: '关闭',
                                value: 0
                            },
                            {
                                label: '运行中',
                                value: 1
                            },
                            {
                                label: '已上线',
                                value: 2
                            },
                            {
                                label: '异常',
                                value: 3
                            }
                        ],
                        filterMultiple: true,
                        filterRemote (value) {
                            // 切换过滤条件时，将条件保存到本地
                            this.filterType = value;
                        }
                    },
                    {
                        title: '上次调度时间',
                        key: 'date',
                        slot: 'date',
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
                size: 10,
                sortType: 'normal', // 当前排序类型，可选值为：normal（默认） || asc（升序）|| desc（降序）,
                sortColumns: '',
                filterType: undefined,
                showCreate: false,
                createData: {
                    desc: ''
                },
                createRules: {
                    desc: [
                        { required: true, message: '请输入描述', trigger: 'blur' }
                    ]
                },
                creating: true,
                updateIndex: -1
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
                const selectedNames = this.selectedData.map(item => item.name);
                data.map(item => {
                    item._checked = selectedNames.indexOf(item.name) >= 0;
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
            },
            totalSelectedCount () {
                let count = 0;
                this.selectedData.forEach(item => {
                    count += item.count;
                });

                return count;
            }
        },
        methods: {
            mockOneData () {
                const item = {};
                item.name = random(6);
                item.desc = '这是一段描述';
                item.count = Math.floor(Math.random() * 1000 + 400);
                item.status = Math.floor(Math.random() * 4);
                item.date = new Date((new Date()).getTime() - Math.floor(Math.random() * 8640000000));
                item._checked = false;
                return item;
            },
            getData () {
                this.current = 1;
                this.loading = true;
                setTimeout(() => {
                    let data = [];
                    for (let i = 0; i < 100; i++) {
                        data.push(this.mockOneData());
                    }
                    this.list = data;
                    this.loading = false;
                }, 1000);
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
                const index = this.selectedData.findIndex(item => item.name === row.name);
                this.selectedData.splice(index, 1);
            },
            // 当前页全选时，判断已选数据是否存在，不存在则添加
            handleSelectAll (selection) {
                selection.forEach(item => {
                    if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
                        this.selectedData.push(item);
                    }
                });
            },
            // 取消当前页全选时，将当前页的数据（即 dataWithPage）从已选项中删除
            handleSelectAllCancel () {
                const selection = this.dataWithPage;
                selection.forEach(item => {
                    const index = this.selectedData.findIndex(i => i.name === item.name);
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
                        const index = this.list.findIndex(i => i.name === item.name);
                        if (index >= 0) {
                            this.list.splice(index, 1);
                        }
                    });
                    this.selectedData = [];
                }
            },
            handleOpenCreate () {
                this.updateIndex = -1;
                this.createData.desc = '';
                this.showCreate = true;
            },
            // 新增数据
            handleCreate () {
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        if (this.updateIndex < 0) {
                            // 新建
                            const mockData = this.mockOneData();
                            mockData.desc = this.createData.desc;
                            mockData.date = new Date();
                            this.list.splice(0, 0, mockData);
                            this.$Message.success('创建成功');
                        } else {
                            // 修改
                            const updateItemName = this.dataWithPage[this.updateIndex].name;
                            const updateItemIndex = this.list.findIndex(item => item.name === updateItemName);
                            this.list[updateItemIndex].desc = this.createData.desc;
                            this.$Message.success('修改成功');
                        }

                        this.showCreate = false;
                        this.creating = false;
                        this.$nextTick(() => {
                            this.creating = true;
                        });
                    } else {
                        this.creating = false;
                        this.$nextTick(() => {
                            this.creating = true;
                        });
                    }
                });
            },
            // 编辑数据
            handleUpdate (index) {
                this.updateIndex = index;
                const item = this.dataWithPage[index];
                this.createData.desc = item.desc;
                this.showCreate = true;
            }
        }
    }
</script>
