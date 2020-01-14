<template>
    <div class="create-form">
        <Modal width="600" :mask-closable="false" v-model="showCreate" title="新建用户" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Form ref="create" :model="createData" :rules="createRules" label-position="left" :label-width="80">
                <FormItem label="账户：" prop="account">
                    <Input v-model="createData.account" placeholder="请输入账户名" />
                </FormItem>
                <FormItem label="姓名：" prop="real_name">
                    <Input v-model="createData.real_name" placeholder="请输入真实姓名" />
                </FormItem>
                <FormItem label="手机号：" prop="phone">
                    <Input v-model="createData.phone" placeholder="请输入手机号" />
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input v-model="createData.password" enter-button="初始密码" placeholder="点击生成初始密码" clearable>
                        <Button type="primary" slot="append" @click="handleInitPassword">初始密码</Button>
                    </Input>
                </FormItem>
                <FormItem label="状态：" prop="status">
                    <Switch v-model="createData.statusFormat" @on-change="handleStatusSwitchChange" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import { AdminShow, AdminStore, AdminUpdate } from '@/api/admin';
    import random_str from '@/libs/random_str';

    export default {
        name: 'create-form',
        data () {
            return {
                showCreate: false,
                updateIndex: -1,
                creating: true,
                currentKeyword: '',
                createData: {
                    account: '',
                    real_name: '',
                    phone: '',
                    password: '',
                    status: 1,
                    statusFormat: true
                },
                createRules: {
                    account: [
                        { required: true, message: '请输入账户名', trigger: 'blur' }
                    ],
                    real_name: [
                        { required: true, message: '请输入真实姓名', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                info: {}
            }
        },
        methods: {
            handleStatusSwitchChange (statusFormat) {
                this.createData.status = statusFormat ? 1 : 0;
                this.createData.statusFormat = statusFormat;
            },
            handleShowUpdateCreate (status, updateIndex) {
                this.showCreate = status;
                this.updateIndex = updateIndex;
                if (this.updateIndex > 0) {
                    this.handleShow();
                }
            },
            handleShow () {
                AdminShow({
                    id: this.updateIndex
                }).then(res => {
                    this.createData = Object.assign(this.createData, res);
                    this.createData.statusFormat = this.createData.status === 1 ? true : false;
                }).finally(() => {
                    this.creating = false;
                })
            },
            // 新增数据
            handleCreate () {
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        if (this.updateIndex < 0) {
                            // 新建
                            AdminStore(this.createData).then(async res => {
                                this.$Message.success('创建成功');
                                this.$emit('on-ok');
                                this.handleCancel();
                            });
                        } else {
                            this.createData.id = this.updateIndex;
                            // 修改
                            AdminUpdate(this.createData).then(res => {
                                this.$Message.success('修改成功');
                                this.$emit('on-ok');
                                this.handleCancel();
                            });
                        }
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
            handleCancel () {
                this.$refs.create.resetFields();
                this.$emit('on-create-form', false, -1);
            },
            handleInitPassword () {
                this.createData.password = random_str(6);
            }
        }
    }
</script>
<style lang="less">
    .ivu-input-icon {
        right: 90px !important;
    }
</style>
