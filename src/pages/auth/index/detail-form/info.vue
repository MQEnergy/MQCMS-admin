<template>
    <div>
        <h2>基本设置</h2>
        <Form ref="form" :model="data" :rules="rules" label-position="top" class="ivu-mt">
            <Row type="flex" :gutter="48">
                <Col v-bind="grid1">
                    <FormItem label="头像" prop="avatar">
                        <Avatar :src="data.avatar" class="setting-account-info-avatar" shape="square" />
                        <br>
                        <Button class="ivu-mt ivu-mb" icon="md-camera" @click="handleUpload">修改头像</Button>
                        <Modal
                            v-model="uploadSeen"
                            title="选择图片"
                            width="800"
                            :mask-closable="false"
                            @on-ok="handleOk"
                            @on-cancel="handleCancel">
                            <upload-form ref="uploadForm" @on-success="handleSuccess" @on-show-image="handleShowImage" :multiple="false" />
                        </Modal>
                    </FormItem>
                </Col>
                <Col v-bind="grid2">
                    <FormItem label="昵称" prop="name">
                        <Input v-model="data.name" placeholder="请输入昵称" />
                    </FormItem>
                    <FormItem label="邮箱" prop="mail">
                        <Input v-model="data.mail" placeholder="请输入邮箱" />
                    </FormItem>
                    <FormItem label="个人介绍" prop="desc">
                        <Input v-model="data.desc" type="textarea" placeholder="请输入个人介绍" />
                    </FormItem>
                    <FormItem label="公司" prop="company">
                        <Input v-model="data.company" placeholder="请输入公司" />
                    </FormItem>
                    <FormItem label="居住地" prop="city">
                        <City v-model="data.city" show-suffix />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit">更新基本信息</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
    import uploadForm from '../../../common/upload-form';
    export default {
        components: {
            uploadForm
        },
        data () {
            return {
                grid1: {
                    xl: {
                        span: 12,
                        order: 2
                    },
                    lg: {
                        span: 24,
                        order: 1
                    },
                    md: {
                        span: 24,
                        order: 1
                    },
                    sm: {
                        span: 24,
                        order: 1
                    },
                    xs: {
                        span: 24,
                        order: 1
                    }
                },
                grid2: {
                    xl: {
                        span: 12,
                        order: 1
                    },
                    lg: {
                        span: 24,
                        order: 2
                    },
                    md: {
                        span: 24,
                        order: 2
                    },
                    sm: {
                        span: 24,
                        order: 2
                    },
                    xs: {
                        span: 24,
                        order: 2
                    }
                },
                data: {
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    name: 'MQCMS',
                    mail: '12312321@qq.com',
                    desc: '',
                    company: 'MQCMS',
                    city: '110000'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入昵称', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { required: true, type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' }
                    ],
                    company: [
                        { required: true, message: '请输入公司', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择居住地', trigger: 'change' }
                    ]
                },
                uploadSeen: false
            }
        },
        methods: {
            handleSubmit () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$Message.success('信息更新成功!');
                    }
                });
            },
            handleOk () {
                console.log('OK')
            },
            handleCancel () {
                this.uploadSeen = false;
            },
            handleSuccess () {
                console.log('OK')
            },
            handleShowImage () {
                console.log('OK')
            },
            handleUpload () {
                this.uploadSeen = true;
            }
        }
    }
</script>
<style lang="less">
    .setting-account-info{
        &-avatar{
            width: 90px;
            height: 90px;
        }
    }
</style>
