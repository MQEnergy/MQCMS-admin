<template>
    <div>
        <Modal width="600" :mask-closable="false" v-model="showCreate" title="新建幻灯片" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="80">
                <FormItem label="名称：" prop="user_name">
                    <Input v-model="createData.user_name" placeholder="请输入用户名" />
                </FormItem>
                <FormItem label="描述：" prop="real_name">
                    <Input v-model="createData.real_name" placeholder="请输入真实姓名" />
                </FormItem>
                <FormItem label="状态：" prop="status">
                    <Switch v-model="createData.statusFormat" @on-change="handleSwitchChange" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import { UserShow, UserStore, UserUpdate } from '@/api/user';
    export default {
        name: 'create-form',
        data () {
            return {
                showCreate: false,
                updateIndex: -1,
                creating: true,
                currentKeyword: '',
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
                UserShow({
                    id: this.updateIndex
                }).then(res => {
                    this.createData = Object.assign(this.createData, res);
                    this.createData.tagKeywordList = this.createData.tag_keyword ? this.createData.tag_keyword.split(',') : [];
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
            handleTagAdd () {
                const index = this.createData.tagKeywordList.indexOf(this.currentKeyword);
                if (index >= 0) {
                    this.$Message.error('关键词已存在');
                    return false;
                }
                this.createData.tagKeywordList.push(this.currentKeyword);
                this.createData.tag_keyword = this.createData.tagKeywordList.join(',');
                this.currentKeyword = '';
            },
            handleCloseTag (event, name) {
                const index = this.createData.tagKeywordList.indexOf(name);
                this.createData.tagKeywordList.splice(index, 1);
                this.createData.tag_keyword = this.createData.tagKeywordList.join(',');
            },
            // 新增数据
            handleCreate () {
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        if (this.updateIndex < 0) {
                            // 新建
                            UserStore(this.createData).then(async res => {
                                this.$Message.success('创建成功');
                                this.$emit('on-ok');
                                this.handleCancel();
                            });
                        } else {
                            this.createData.id = this.updateIndex;
                            // 修改
                            UserUpdate(this.createData).then(res => {
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
                this.createData.tagKeywordList = [];
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
