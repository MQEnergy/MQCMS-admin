<template>
    <div>
        <Modal width="600" :mask-closable="false" v-model="showCreate" title="新建导航" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="80">
                <FormItem label="名称：" prop="nav_name">
                    <Input v-model="createData.nav_name" placeholder="请输入名称" />
                </FormItem>
                <FormItem label="描述：" prop="nav_desc">
                    <Input v-model="createData.nav_desc" placeholder="请输入描述" />
                </FormItem>
                <FormItem label="主导航：" prop="is_main">
                    <Switch v-model="createData.isMainFormat" @on-change="handleMainChange" />
                </FormItem>
                <FormItem label="状态：" prop="status">
                    <Switch v-model="createData.statusFormat" @on-change="handleSwitchChange" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import {NavigationShow, NavigationStore, NavigationUpdate} from "@api/navbar";
    export default {
        name: 'create-form',
        data () {
            return {
                showCreate: false,
                updateIndex: -1,
                creating: true,
                currentKeyword: '',
                createData: {
                    nav_name: '',
                    nav_desc: '',
                    phone: '',
                    status: 1,
                    is_main: 0,
                    statusFormat: true,
                    isMainFormat: false,
                },
                createRules: {
                    nav_name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                },
                info: {}
            }
        },
        methods: {
            handleShowUpdateCreate (status, updateIndex) {
                this.showCreate = status;
                this.updateIndex = updateIndex;
                if (this.updateIndex > 0) {
                    this.handleShow();
                }
            },
            handleShow () {
                NavigationShow({
                    id: this.updateIndex
                }).then(res => {
                    this.createData = Object.assign(this.createData, res);
                }).finally(() => {
                    this.creating = false;
                })
            },
            handleHotSwitchChange (isHot) {
                this.createData.is_hot = isHot ? 1 : 0;
                this.createData.hotFormat = isHot;
            },
            handleStatusSwitchChange (status) {
                this.createData.status = status ? 1 : 0;
                this.createData.statusFormat = status;
            },
            // 新增数据
            handleCreate () {
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        if (this.updateIndex < 0) {
                            // 新建
                            NavigationStore(this.createData).then(async res => {
                                this.$Message.success('创建成功');
                                this.$emit('on-ok');
                                this.handleCancel();
                            });
                        } else {
                            this.createData.id = this.updateIndex;
                            // 修改
                            NavigationUpdate(this.createData).then(res => {
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
            handleSwitchChange (status) {
                this.createData.status = status ? 1 : 0;
                this.createData.statusFormat = status;
            },
            handleMainChange (status) {
                this.createData.is_main = status ? 1 : 0;
                this.createData.isMainFormat = status;
            }
        }
    }
</script>
<style scoped>
</style>
