<template>
    <div>
        <Modal width="600" :mask-closable="false" v-model="showCreate" title="新建分类" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Form ref="create" :model="createData" :rules="rules" :label-width="100" label-position="right">
                <Tabs type="card">
                    <TabPane label="基本属性">
                        <FormItem label="分类名称" prop="cate_name">
                            <Input v-model="createData.cate_name" placeholder="请输入分类名称" />
                        </FormItem>
                        <FormItem label="分类别名" prop="alias_name">
                            <Input v-model="createData.alias_name" placeholder="请输入分类别名" />
                        </FormItem>
                        <FormItem label="分类描述" prop="cate_desc">
                            <Input v-model="createData.cate_desc" placeholder="请输入分类描述" />
                        </FormItem>
                        <FormItem label="父级分类" prop="parent_id">
                            <Select v-model="createData.parent_id" placeholder="请选择父级分类" clearable>
                                <Option :value="0">作为一级分类</Option>
                                <Option v-for="(item, index) in cateList" :key="index" :value="item.id">{{ item.cate_name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="排序" prop="sort_order">
                            <Input type="number" v-model="createData.sort_order" placeholder="请输入排序" />
                        </FormItem>
                        <FormItem label="状态：" prop="status">
                            <Switch v-model="createData.statusFormat" @on-change="handleStatusSwitchChange" />
                        </FormItem>
                    </TabPane>
                    <TabPane label="SEO设置">
                        <FormItem label="SEO标题" prop="seo_title">
                            <Input v-model="createData.seo_title" placeholder="请输入SEO标题" />
                        </FormItem>
                        <FormItem label="SEO关键字" prop="seo_keyword">
                            <Input v-model="createData.seo_keyword" placeholder="请输入SEO关键字" />
                        </FormItem>
                        <FormItem label="SEO描述" prop="seo_desc">
                            <Input v-model="createData.seo_desc" placeholder="请输入SEO描述" />
                        </FormItem>
                    </TabPane>
                    <TabPane label="模板设置">
                        <FormItem label="列表模板" prop="list_template_id">
                            <Select v-model="createData.list_template_id" placeholder="请选择是否发布">
                                <Option value="1">文章列表页（portal/index.html）</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="文章模板" prop="detail_template_id">
                            <Select v-model="createData.detail_template_id" placeholder="请选择是否发布">
                                <Option value="1">文章详情页（portal/detail.html）</Option>
                            </Select>
                        </FormItem>
                    </TabPane>
                </Tabs>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import { CategoryIndex, CategoryShow, CategoryStore, CategoryUpdate } from '@api/category';
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
                creating: true,
                currentKeyword: '',
                createData: {
                    cate_name: '',
                    alias_name: '',
                    cate_desc: '',
                    parent_id: 0,
                    seo_title: '',
                    seo_keyword: '',
                    seo_desc: '',
                    list_template_id: '1',
                    detail_template_id: '1',
                    status: 1,
                    sort_order: 50,
                    statusFormat: true
                },
                rules: {
                    cate_name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' }
                    ],
                    alias_name: [
                        { required: true, message: '请输入分类别名', trigger: 'blur' }
                    ]
                },
                info: {},
                cateList: [],
            }
        },
        mounted() {
        },
        methods: {
            handleShowUpdateCreate (status, updateIndex) {
                this.showCreate = status;
                this.updateIndex = updateIndex;
                this.handleCateList();
                if (this.updateIndex > 0) {
                    this.handleShow();
                }
            },
            handleCateList () {
                CategoryIndex({
                    limit: 100
                }).then(res => {
                    console.log(res.data);
                    this.cateList = res.data;
                }).finally(() => {

                });
            },
            handleShow () {
                CategoryShow({
                    id: this.updateIndex
                }).then(res => {
                    res.list_template_id = res.list_template_id.toString();
                    res.detail_template_id = res.detail_template_id.toString();
                    this.createData = Object.assign(this.createData, res);
                }).finally(() => {
                    this.creating = false;
                })
            },
            handleCancel () {
                this.$refs.create.resetFields();
                this.$emit('on-create-form', false, -1);
            },
            handleCreate () {
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        if (this.updateIndex < 0) {
                            // 新建
                            CategoryStore(this.createData).then(async res => {
                                this.$Message.success('创建成功');
                                this.$emit('on-ok');
                                this.handleCancel();
                            });
                        } else {
                            this.createData.id = this.updateIndex;
                            // 修改
                            CategoryUpdate(this.createData).then(res => {
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
                        console.log(this.showCreate);
                        this.creating = false;
                        this.$nextTick(() => {
                            this.creating = true;
                        });
                    }
                });
            },
            handleStatusSwitchChange (status) {
                this.createData.status = status ? 1 : 0;
                this.createData.statusFormat = status;
            },
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
