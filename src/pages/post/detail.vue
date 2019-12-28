<template>
    <div>
        <Form ref="form" :model="newFormData" :rules="rules">
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="发布者" label-position="top" prop="user_name">
                        <Input v-model="newFormData.user_name" placeholder="请输入发布者姓名" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="绑定链接" label-position="top" prop="link_url">
                        <Input v-model="newFormData.link_url" placeholder="请填入网址">
                            <span slot="prepend">http://</span>
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="资源类型" label-position="top" prop="label_type">
                        <Select v-model="newFormData.label_type" placeholder="请选择资源类型">
                            <Option value="1">单图</Option>
                            <Option value="2">视频</Option>
                            <Option value="3">多类别</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="是否发布" label-position="top" prop="is_publish">
                        <Select v-model="newFormData.is_publish" placeholder="请选择是否发布">
                            <Option value="1">发布</Option>
                            <Option value="0">草稿</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="关联标签" label-position="top" prop="current_tag">
                <Input v-model="newFormData.current_tag" placeholder="请输入标签搜索和新建标签" @keyup.enter.native="handleTagAdd" />
                <Tag @on-close="handleCloseTag" v-for="item in newFormData.relation_tags_list" :key="item" :name="item" type="border" color="primary" closable>{{ item }}</Tag>
            </FormItem>
            <FormItem label="发布内容" label-position="top" prop="post_content">
                <Input type="textarea" v-model="newFormData.post_content" :rows="4" placeholder="请输入发布内容" />
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="handleCancel">取消</Button>
            <Button type="primary" :loading="creating" @click="handleSubmit">提交</Button>
        </div>
    </div>
</template>
<script>
    import { PostStore, PostUpdate } from '@/api/post';
    export default {
        props: {
            info: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                formData: {},
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
                creating: false,
                updateIndex: -1
            }
        },
        computed: {
            newFormData () {
                this.info.relation_tags_list = this.info.relation_tags ? this.info.relation_tags.split(',') : [];
                this.info.current_tag = '';
                return Object.assign(this.formData, this.info);
            }
        },
        methods: {
            handleCancel () {
                this.creating = false;
                this.$emit('on-cancel');
            },
            handleSubmit () {
                this.$refs.form.validate((valid) => {
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
                                this.$refs.form.resetFields();
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
                                this.$refs.form.resetFields();
                            });
                        }
                        this.creating = false;
                    } else {
                        this.creating = false;
                    }
                });
            },
            handleTagAdd () {
                const index = this.newFormData.relation_tags_list.indexOf(this.newFormData.current_tag);
                if (index >= 0) {
                    this.$Message.error('标签已存在');
                    return false;
                }
                this.newFormData.relation_tags_list.push(this.newFormData.current_tag);
                console.log(this.newFormData)
            },
            handleCloseTag (event, name) {
                const index = this.newFormData.relation_tags_list.indexOf(name);
                this.newFormData.relation_tags_list.splice(index, 1);
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
