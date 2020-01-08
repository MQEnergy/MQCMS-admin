<template>
    <div>
        <Drawer
            title="发布编辑帖子"
            v-model="showCreate"
            width="720"
            :mask-closable="false"
            :styles="styles">
            <Form ref="create" :model="createData" :rules="rules">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="发布者" label-position="top" prop="user_name">
                            <Input v-model="createData.user_name" placeholder="请输入发布者姓名" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="绑定链接" label-position="top" prop="link_url">
                            <Input v-model="createData.link_url" placeholder="请填入网址">
                                <span slot="prepend">http://</span>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="资源类型" label-position="top" prop="label_type">
                            <Select v-model="createData.label_type" placeholder="请选择资源类型">
                                <Option value="1">单图</Option>
                                <Option value="2">视频</Option>
                                <Option value="3">多类别</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="是否发布" label-position="top" prop="is_publish">
                            <Select v-model="createData.is_publish" placeholder="请选择是否发布">
                                <Option value="1">发布</Option>
                                <Option value="0">草稿</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="关联标签" label-position="top" prop="current_tag">
                    <Input v-model="createData.current_tag" placeholder="请输入标签搜索和新建标签" @keyup.enter.native="handleTagAdd" />
                    <Tag @on-close="handleCloseTag" v-for="item in createData.relation_tags_list" :key="item" :name="item" type="border" color="primary" closable>{{ item }}</Tag>
                </FormItem>
                <FormItem label="发布内容" label-position="top" prop="post_content">
                    <Input type="textarea" v-model="createData.post_content" :rows="4" placeholder="请输入发布内容" />
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="handleCancel">取消</Button>
                <Button type="primary" :loading="creating" @click="handleSubmit">提交</Button>
            </div>
        </Drawer>
    </div>
</template>
<script>
    import { PostShow, PostStore, PostUpdate } from '@/api/post';
    export default {
        name: 'create-form',
        data () {
            return {
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                showCreate: false,
                updateIndex: -1,
                creating: false,
                currentKeyword: '',
                createData: {
                    user_name: '',
                    label_type: '',
                    tag_title: '',
                    tag_keyword: '',
                    relation_tags_list: [],
                    is_publish: 1,
                    publishFormat: true,
                    status: 1,
                    statusFormat: true
                },
                rules: {
                    user_name: [
                        { required: true, message: '请输入发布者姓名', trigger: 'blur' }
                    ],
                    label_type: [
                        { required: true, message: '请选择资源类型', trigger: 'change' }
                    ],
                    is_publish: [
                        { required: true, message: '请选择是否发布', trigger: 'change' }
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
                PostShow({
                    id: this.updateIndex
                }).then(res => {
                    this.createData = Object.assign(this.createData, res);
                    this.createData.relation_tags_list = this.createData.relation_tags ? this.createData.relation_tags.split(',') : [];
                }).finally(() => {
                    this.creating = false;
                })
            },
            handleCancel () {
                this.$refs.create.resetFields();
                this.$emit('on-create-form', false, -1);
            },
            handleSubmit () {
                this.$refs.create.validate((valid) => {
                    this.creating = true;
                    if (valid) {
                        if (this.updateIndex < 0) {
                            // 新建
                            PostStore(
                                this.formData
                            ).then(async res => {
                                this.$emit('on-ok');
                                this.$Message.success('创建成功');
                            }).finally(() => {
                                this.$refs.create.resetFields();
                            });
                        } else {
                            // 修改
                            const info = this.list[this.updateIndex];
                            this.formData.id = info.id;
                            PostUpdate(
                                this.formData
                            ).then(async res => {
                                this.$emit('on-ok');
                                this.$Message.success('修改成功');
                            }).finally(() => {
                                this.$refs.create.resetFields();
                            });
                        }
                        this.creating = false;
                    } else {
                        this.creating = false;
                    }
                });
            },
            handleTagAdd () {
                const index = this.createData.relation_tags_list.indexOf(this.createData.current_tag);
                if (index >= 0) {
                    this.$Message.error('标签已存在');
                    return false;
                }
                this.createData.relation_tags_list.push(this.createData.current_tag);
                console.log(this.createData)
            },
            handleCloseTag (event, name) {
                const index = this.createData.relation_tags_list.indexOf(name);
                this.createData.relation_tags_list.splice(index, 1);
            }
        }
    }
</script>
<style>
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>
