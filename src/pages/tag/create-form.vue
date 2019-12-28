<template>
    <div>
        <Modal width="600" :mask-closable="false" v-model="showCreate" title="新建标签" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Form ref="create" :model="createData" :rules="createRules" label-position="left" :label-width="110">
                <FormItem label="名称：" prop="tag_name">
                    <Input v-model="createData.tag_name" placeholder="请输入名称" />
                </FormItem>
                <FormItem label="标题(SEO)：" prop="tag_title">
                    <Input v-model="createData.tag_title" placeholder="请输入名称" />
                </FormItem>
                <FormItem label="描述(SEO)：" prop="tag_desc">
                    <Input v-model="createData.tag_desc" placeholder="请输入名称" />
                </FormItem>
                <FormItem label="关键词(SEO)：" label-position="top" prop="tag_keyword">
                    <Input v-model="currentKeyword" placeholder="请输入关键词并enter" @keyup.enter.native="handleTagAdd" />
                    <Tag @on-close="handleCloseTag" v-for="item in createData.tagKeywordList" :key="item" :name="item" type="border" color="primary" closable>{{ item }}</Tag>
                </FormItem>
                <FormItem label="热门：" prop="is_hot">
                    <Switch v-model="createData.hotFormat" @on-change="handleHotSwitchChange" />
                </FormItem>
                <FormItem label="状态：" prop="status">
                    <Switch v-model="createData.statusFormat" @on-change="handleStatusSwitchChange" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import { TagShow, TagStore, TagUpdate } from '@/api/tag';
    export default {
        name: 'create-form',
        data () {
            return {
                showCreate: false,
                updateIndex: -1,
                creating: true,
                currentKeyword: '',
                createData: {
                    tag_name: '',
                    tag_desc: '',
                    tag_title: '',
                    tag_keyword: '',
                    tagKeywordList: [],
                    is_hot: 1,
                    hotFormat: true,
                    status: 1,
                    statusFormat: true
                },
                createRules: {
                    tag_name: [
                        { required: true, message: '请输入标签名称', trigger: 'blur' }
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
                TagShow({
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
                            TagStore(this.createData).then(async res => {
                                this.$Message.success('创建成功');
                                this.$emit('on-ok');
                                this.handleCancel();
                            });
                        } else {
                            this.createData.id = this.updateIndex;
                            // 修改
                            TagUpdate(this.createData).then(res => {
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
            }
        }
    }
</script>
<style scoped>
</style>
