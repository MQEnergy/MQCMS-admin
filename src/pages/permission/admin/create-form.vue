<template>
    <div>
        <Modal width="600" :mask-closable="false" v-model="showCreate" :title="modalTitle" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Form class="create-form" ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="80">
                <FormItem label="账号：" prop="account">
                    <Input v-model="createData.account" placeholder="请输入账号" clearable />
                </FormItem>
                <FormItem label="姓名：" prop="real_name">
                    <Input v-model="createData.real_name" placeholder="请输入真实姓名" clearable />
                </FormItem>
                <FormItem label="头像：" prop="avatar">
                    <div class="upload-list" v-for="item in uploadList">
                        <Avatar shape="square" :src="item.attach_full_url" />
                    </div>
                    <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :headers="headers"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            type="drag"
                            :action="uploadUrl"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="手机号：" prop="phone">
                    <Input v-model="createData.phone" placeholder="请输入手机号" clearable />
                </FormItem>
                <FormItem label="密码：" prop="password">
                    <Input v-model="createData.password" enter-button="初始密码" placeholder="点击生成初始密码" clearable>
                        <Button type="primary" slot="append" @click="handleInitPassword">初始密码</Button>
                    </Input>
                </FormItem>
                <FormItem label="状态：" prop="status">
                    <Switch v-model="createData.statusFormat" @on-change="handleSwitchChange" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import { AdminView, AdminCreate, AdminUpdate } from '@/api/permission/admin';
import random_str from '@/libs/random_str';
import util from "@/libs/util";

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
                password: '',
                phone: '',
                avatar: '',
                status: 1,
                statusFormat: true
            },
            createRules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            info: {},
            modalTitle: '新建',
            uploadList: [],
            uploadUrl: '/admin/attachment/upload',
            showBigImg: false,
        }
    },
    computed: {
        headers () {
            const token = util.cookies.get('token');
            return {
                'Authorization': 'Bearer ' + token
            }
        }
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
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
            AdminView({
                id: this.updateIndex
            }).then(res => {
                delete res.password;
                this.createData = Object.assign(this.createData, res);
                this.uploadList = [
                    {
                        'attach_url': this.createData.avatar,
                        'attach_full_url': this.createData.full_avatar,
                    }
                ];
            }).finally(() => {
                this.creating = false;
                this.$nextTick(() => {
                    this.creating = true;
                });
            })
        },
        // 新增数据
        handleCreate () {
            this.$refs.create.validate((valid) => {
                if (valid) {
                    if (this.updateIndex < 0) {
                        // 新建
                        AdminCreate(this.createData).then(async res => {
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
            this.uploadList = [];
            this.$emit('on-create-form', false, -1);
        },
        handleSwitchChange (status) {
            this.createData.status = status ? 1 : 0;
            this.createData.statusFormat = status;
        },
        handleInitPassword () {
            this.createData.password = random_str(6);
        },
        handleRemove(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
        },
        handleSuccess (res, file, fileList) {
            this.createData.avatar = res ? res.attach_url : '';
            this.uploadList = [
                {
                    'attach_url': res.attach_url,
                    'attach_full_url': res.attach_full_url,
                }
            ];
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '上传图片格式错误',
                desc: '文件名：' + file.name + '格式不正确, 请选择jpg,png或jpeg.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '文件大小超出了限制',
                desc: '文件名：' + file.name + ' 太大，不能超过2M.'
            });
        }
    }
}
</script>
<style>
    .create-form .ivu-input-hide-icon .ivu-input-icon {
        right: 90px !important;
    }
    .upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .upload-list .ivu-avatar {
        width: 100%;
        height: 100%;
    }
    .upload-list .ivu-avatar > img {
        height: 100%;
        width: 100%;
    }
</style>
