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
            <template slot-scope="{ row }" slot="id">
                <div>{{ row.id }}</div>
            </template>
            <template slot-scope="{ row }" slot="user_name">
                <div>{{ row.user_name }}</div>
            </template>
            <template slot-scope="{ row }" slot="real_name">
                <div>{{ row.real_name }}</div>
            </template>
            <template slot-scope="{ row }" slot="status">
                <Badge v-if="row.status === 0" status="default" text="禁用" />
                <Badge v-if="row.status === 1" status="processing" text="正常" />
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

        <Modal v-model="showCreate" title="新建用户" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Form ref="create" :model="createData" :rules="createRules" label-position="left" :label-width="80">
                <FormItem label="用户名：" prop="user_name">
                    <Input v-model="createData.user_name" placeholder="请输入用户名" />
                </FormItem>
                <FormItem label="姓名：" prop="real_name">
                    <Input v-model="createData.real_name" placeholder="请输入真实姓名" />
                </FormItem>
                <FormItem label="手机号：" prop="phone">
                    <Input v-model="createData.phone" placeholder="请输入手机号" />
                </FormItem>
                <FormItem label="状态：" prop="status">
                    <Switch v-model="createData.statusFormat" @on-change="handleSwitchChange" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import { UserIndex, UserStore, UserUpdate } from '@/api/user';

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
                        title: 'ID',
                        key: 'id',
                        minWidth: 80
                    },
                    {
                        title: '用户名',
                        key: 'user_name',
                        minWidth: 100
                    },
                    {
                        title: '真实姓名',
                        key: 'real_name',
                        minWidth: 100
                    },
                    {
                        title: '手机号',
                        key: 'phone',
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
                current: 1,
                total: 0,
                size: 10,
                sortType: 'normal', // 当前排序类型，可选值为：normal（默认） || asc（升序）|| desc（降序）,
                sortColumns: '',
                filterType: undefined,
                showCreate: false,
                createData: {
                    user_name: '',
                    real_name: '',
                    phone: '',
                    status: 1,
                    statusFormat: true
                },
                createRules: {
                    user_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    real_name: [
                        { required: true, message: '请输入真实姓名', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
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
                UserIndex({
                    page: this.current,
                    limit: this.size
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
                this.updateIndex = -1;
                this.showCreate = true;
            },
            // 新增数据
            handleCreate () {
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        if (this.updateIndex < 0) {
                            // 新建
                            UserStore(
                                this.createData
                            ).then(async res => {
                                this.getData();
                                this.$Message.success('创建成功');
                            });
                        } else {
                            // 修改
                            const info = this.list[this.updateIndex];
                            this.createData.id = info.id;
                            UserUpdate(this.createData).then(res => {
                                const updateItemIndex = this.list.findIndex(item => item.id === info.id);
                                this.list[updateItemIndex].user_name = this.createData.user_name;
                                this.list[updateItemIndex].real_name = this.createData.real_name;
                                this.list[updateItemIndex].phone = this.createData.phone;
                                this.list[updateItemIndex].status = this.createData.status;
                                this.$Message.success('修改成功');
                            });
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

                const item = this.list[index];
                this.createData = {
                    user_name: item.user_name,
                    real_name: item.real_name,
                    phone: item.phone,
                    status: item.status,
                    statusFormat: item.status === 1
                };
                this.showCreate = true;
            },
            handleCancel () {
                this.$refs.create.resetFields();
            },
            handleChange (page) {
                this.current = page;
                this.getData();
            },
            handleSwitchChange (status) {
                this.createData.status = status ? 1 : 0;
                this.createData.statusFormat = status;
            }
        }
    }
</script>
