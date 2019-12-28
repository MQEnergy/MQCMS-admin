<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="基础列表" content="标准的列表，包含增删改查等基础操作。" hidden-breadcrumb />
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Row type="flex" justify="center" align="middle" class="ivu-text-center">
                <Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" class="ivu-mt ivu-mb">
                    <p>进行中的任务</p>
                    <p v-font="24">10 个任务</p>
                </Col>
                <Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" class="ivu-mt ivu-mb">
                    <p>剩余任务</p>
                    <p v-font="24">3 个任务</p>
                </Col>
                <Col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" class="ivu-mt ivu-mb">
                    <p>任务总耗时</p>
                    <p v-font="24">120 个小时</p>
                </Col>
            </Row>
        </Card>
        <Card title="基础列表" :bordered="false" dis-hover class="ivu-mt">
            <div slot="extra" v-if="!isMobile">
                <RadioGroup v-model="type" type="button">
                    <Radio label="all">全部</Radio>
                    <Radio label="doing">进行中</Radio>
                    <Radio label="done">已完成</Radio>
                </RadioGroup>
                <Input search placeholder="请输入..." v-width="200" class="ivu-ml" />
            </div>
            <div>
                <Button long type="dashed" icon="md-add" @click="handleAdd">添加</Button>
                <List :loading="loading" class="ivu-mt">
                    <div v-height="300" v-if="loading"></div>
                    <ListItem v-for="(item, index) in data" :key="item.project">
                        <ListItemMeta :title="item.project" :description="item.desc">
                            <Avatar :src="item.icon" shape="square" size="large" slot="avatar" />
                        </ListItemMeta>
                        <div class="list-basic-list-content">
                            <div class="list-basic-list-content-item">
                                <span>负责人</span>
                                <p>{{ item.owner }}</p>
                            </div>
                            <div class="list-basic-list-content-item">
                                <span>开始时间</span>
                                <p>{{ item.time | date_format('YYYY-MM-DD HH:mm:ss') }}</p>
                            </div>
                            <div class="list-basic-list-content-item" v-width="180">
                                <Progress :percent="item.progress" :status="item.status" :stroke-width="6" />
                            </div>
                        </div>
                        <template slot="action">
                            <li>
                                <Button type="text" @click="handleUpdate(index)">编辑</Button>
                            </li>
                            <li>
                                <Dropdown @on-click="(name) => handleClickMore(name, index)">
                                    <Button type="text">更多<Icon type="ios-arrow-down" /></Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="update">编辑</DropdownItem>
                                        <DropdownItem name="delete">删除</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        </template>
                    </ListItem>
                </List>
                <div class="ivu-mt ivu-text-right">
                    <Page :total="100" show-elevator :simple="isMobile" />
                </div>
            </div>
        </Card>

        <Modal v-model="showUpdate" title="任务编辑" :loading="submitting" @on-ok="handleSubmit">
            <Form :model="newData" :rules="rules" ref="form">
                <FormItem label="任务名称：" prop="project">
                    <Input v-model="newData.project" placeholder="请输入任务名称" />
                </FormItem>
                <FormItem label="开始时间：" prop="time">
                    <DatePicker v-model="newData.time" type="datetime" placeholder="请选择开始时间" v-width="'100%'" />
                </FormItem>
                <FormItem label="负责人：" prop="owner">
                    <Select v-model="newData.owner" placeholder="请选择负责人">
                        <Option value="Aresn">Aresn</Option>
                        <Option value="中小鱼">中小鱼</Option>
                        <Option value="Echo">Echo</Option>
                        <Option value="唐不苦">唐不苦</Option>
                        <Option value="甜筒">甜筒</Option>
                    </Select>
                </FormItem>
                <FormItem label="任务描述：" prop="desc">
                    <Input v-model="newData.desc" type="textarea" placeholder="请输入任务描述" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import listData from './data';
    const baseData = {
        project: '',
        time: '',
        owner: '',
        desc: '',
        icon: 'https://dev-file.iviewui.com/p50TGdvvpXWVR06Vu2TAwkpRnpt8FURA/avatar',
        progress: 0,
        status: 'normal'
    };

    export default {
        name: 'list-basic-list',
        data () {
            return {
                type: 'all',
                data: [],
                loading: false,
                showUpdate: false,
                submitting: true,
                updateIndex: -1,
                newData: Object.assign({}, baseData),
                rules: {
                    project: [
                        { required: true, message: '请输入任务名称', trigger: 'blur' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择开始时间', trigger: 'change' }
                    ],
                    owner: [
                        { required: true, message: '请选择负责人', trigger: 'change' }
                    ]
                }
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile'
            ])
        },
        methods: {
            handleAdd () {
                this.newData = Object.assign({}, baseData);
                this.updateIndex = -1;
                this.showUpdate = true;
                this.$refs.form.resetFields();
            },
            handleUpdate (index) {
                this.newData = Object.assign({}, this.data[index]);
                this.updateIndex = index;
                this.showUpdate = true;
            },
            handleClickMore (name, index) {
                if (name === 'update') {
                    this.handleUpdate(index);
                } else if (name === 'delete') {
                    this.$Modal.confirm({
                        title: '删除任务',
                        content: '确定删除该任务吗？',
                        onOk: () => {
                            this.data.splice(index, 1);
                            this.$Message.success('删除成功');
                        }
                    });
                }
            },
            handleSubmit () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        setTimeout(() => {
                            if (this.updateIndex >= 0) {
                                this.data[this.updateIndex] = Object.assign({}, this.newData);
                            } else {
                                this.data.push(this.newData);
                            }
                            this.$Message.success('编辑成功!');
                            this.showUpdate = false;
                            this.submitting = false;
                            this.$nextTick(() => {
                                this.submitting = true;
                            });
                        }, 1000);
                    } else {
                        this.submitting = false;
                        this.$nextTick(() => {
                            this.submitting = true;
                        });
                    }
                });
            },
            getData () {
                this.loading = true;
                setTimeout(() => {
                    this.data = listData;
                    this.loading = false;
                }, 1000);
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>
<style lang="less">
    .list-basic-list{
        &-content{
            font-size: 0;
        }
        &-content-item{
            display: inline-block;
            margin-left: 32px;
            color: #808695;
            font-size: 14px;
            vertical-align: middle;
        }
    }
</style>
