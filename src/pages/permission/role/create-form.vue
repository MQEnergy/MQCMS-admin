<template>
    <div>
        <Modal width="600" :mask-closable="false" v-model="showCreate" :title="modalTitle" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="80">
                <FormItem label="名称：" prop="name">
                    <Input v-model="createData.name" placeholder="请输入名称" />
                </FormItem>
                <FormItem label="描述：" prop="desc">
                    <Input v-model="createData.desc" placeholder="请输入描述" />
                </FormItem>
                <FormItem label="状态：" prop="status">
                    <Switch v-model="createData.statusFormat" @on-change="handleSwitchChange" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import { RoleView, RoleCreate, RoleUpdate } from '@/api/permission/role';
    export default {
        name: 'create-form',
        data () {
            return {
                showCreate: false,
                updateIndex: -1,
                creating: true,
                currentKeyword: '',
                createData: {
                    name: '',
                    desc: '',
                    menu_ids: '',
                    status: 1,
                    statusFormat: true
                },
                createRules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                },
                info: {},
                modalTitle: '新建'
            }
        },
        methods: {
            handleShowUpdateCreate (status, updateIndex) {
                this.showCreate = status;
                this.updateIndex = updateIndex;
                this.modalTitle = updateIndex < 0 ? '新建' : '编辑';
                if (this.updateIndex > 0) {
                    this.handleShow();
                }
            },
            handleShow () {
                RoleView({
                    id: this.updateIndex
                }).then(res => {
                    this.createData = Object.assign(this.createData, res);
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
                            RoleCreate(this.createData).then(async res => {
                                this.$Message.success('创建成功');
                                this.$emit('on-ok');
                                this.handleCancel();
                            });
                        } else {
                            this.createData.id = this.updateIndex;
                            // 修改
                            RoleUpdate(this.createData).then(res => {
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
                this.createData = {
                    name: '',
                    desc: '',
                    menu_ids: '',
                    status: 1,
                    statusFormat: true
                };
                this.$emit('on-create-form', false, -1);
            },
            handleSwitchChange (status) {
                this.createData.status = status ? 1 : 0;
                this.createData.statusFormat = status;
            }
        }
    }
</script>
<style scoped>
</style>
