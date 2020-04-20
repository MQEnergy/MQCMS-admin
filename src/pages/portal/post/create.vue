<template>
    <div class="post-add-container">
        <div class="i-layout-page-header">
            <page-header title="添加文章" content="" hidden-breadcrumb/>
        </div>
        <Form ref="create" :model="createData" :rules="rules">
            <Card :bordered="false" dis-hover class="ivu-mt">
                <Row :gutter="16">
                    <Col :xl="16" :lg="16" :md="24" :sm="24" :xs="24">
                        <Card dis-hover>
                            <div slot="title">基础信息</div>
                            <div class="list-group-container">
                                <FormItem label="分类" prop="cate_id">
                                    <Select v-model="createData.cate_id" clearable>
                                        <Option v-for="(item, index) in cateList" :key="index" :value="item.id">{{ item.cate_name }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="标题" prop="post_title">
                                    <Input v-model="createData.post_title" placeholder="请输入标题"/>
                                </FormItem>
                                <FormItem label="关键词" prop="relation_tag_ids">
                                    <Input v-model="createData.relation_tag_ids" placeholder="请输入关键词"/>
                                </FormItem>
                                <FormItem label="文章来源" prop="post_source">
                                    <Input v-model="createData.post_source" placeholder="请输入文章来源"/>
                                </FormItem>
                                <FormItem label="摘要" prop="post_excerpt">
                                    <Input type="textarea" v-model="createData.post_excerpt" placeholder="请输入摘要"/>
                                </FormItem>
                                <FormItem label="内容" prop="post_content">
                                    <div style="margin-top: 35px;">
                                        <quill-editor
                                                class="editor"
                                                ref="myTextEditor"
                                                :value="createData.post_content"
                                                :options="editorOption"
                                                @change="onEditorChange"
                                                @blur="onEditorBlur($event)"
                                                @focus="onEditorFocus($event)"
                                                @ready="onEditorReady($event)"
                                        />
                                    </div>
                                </FormItem>
                                <FormItem label="排序" prop="sort_order">
                                    <Input type="number" v-model="createData.sort_order" placeholder="请输入排序"/>
                                </FormItem>
                                <FormItem>
                                    <Button :loading="creating" type="primary" @click="handleSubmit">保存</Button>&nbsp;
                                    <Button type="primary" @click="handleSubmit">保存为草稿</Button>&nbsp;
                                    <Button type="default" @click="handleReset">取消</Button>
                                </FormItem>
                            </div>
                        </Card>
                    </Col>
                    <Col :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="ivu-mb">
                        <Card dis-hover>
                            <div slot="title">缩略图</div>
                            <div class="list-group-container">
                                <div class="ivu-text-center">
                                    <div>
                                        <img v-if="createData.full_thumb_url" class="ivu-b"
                                             style="width: 150px; height: 150px;"
                                             :src="createData.full_thumb_url" alt="">
                                        <img v-else src="@/assets/svg/no-picture.svg"
                                             style="width: 100px; height: 100px;" alt="">
                                    </div>
                                    <Button icon="ios-camera" @click="handleShowUpload">上传缩略图</Button>
                                </div>
                            </div>
                        </Card>
                        <Card dis-hover class="ivu-mt-16">
                            <div slot="title">其他设置</div>
                            <div class="list-group-container">
                                <FormItem prop="post_source">
                                    <div slot="label">
                                        <span>标题外链</span>&nbsp;
                                        <Checkbox v-model="createData.use_link_format" @on-change="handleStatusSwitchChange(4)"></Checkbox>
                                    </div>
                                    <Input v-model="createData.link_url" placeholder="请输入标题外链"/>
                                </FormItem>
                                <FormItem label="发布日期" prop="publish_time">
                                    <DatePicker v-model="createData.publish_time" type="datetime" placeholder="选择日期" style="width: 100%"></DatePicker>
                                </FormItem>
                                <FormItem label="发布状态">
                                    <Checkbox v-model="createData.is_publish_format"  @on-change="handleStatusSwitchChange(1)" >发布</Checkbox>
                                    <Checkbox v-model="createData.is_top_format" @on-change="handleStatusSwitchChange(2)">置顶</Checkbox>
                                    <Checkbox v-model="createData.is_recommend_format" @on-change="handleStatusSwitchChange(3)">推荐</Checkbox>
                                </FormItem>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Form>
        <Modal
                v-model="uploadFormSeen"
                title="选择图片"
                width="800"
                :mask-closable="false"
                @on-ok="handleOk"
                @on-cancel="handleCancel">
            <upload-form ref="uploadForm" @on-success="handleSuccess"
                         @on-show-image="handleShowImage" @on-select-image="handleSelectImage"
                         :multiple="false"/>
        </Modal>
    </div>
</template>

<script>
    import dedent from 'dedent'
    import hljs from 'highlight.js'
    import debounce from 'lodash/debounce'
    import {quillEditor} from 'vue-quill-editor'
    import 'highlight.js/styles/tomorrow.css'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import UploadForm from "@/components/uploadform/index";
    import {PostStore, PostUpdate} from "@api/post";
    import {CategoryIndex} from "@api/category";

    export default {
        name: 'portal-post-create',
        title: '添加文章',
        components: {
            UploadForm,
            quillEditor
        },
        data() {
            const currentTime = require('dayjs')().format('YYYY-M-D HH:mm:ss');
            return {
                editorOption: {
                    placeholder: "请输入内容",
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                            ['blockquote', 'code-block'], // 引用  代码块
                            [{'header': 1}, {'header': 2}],// 1、2 级标题
                            [{'list': 'ordered'}, {'list': 'bullet'}], // 有序、无序列表
                            [{'script': 'sub'}, {'script': 'super'}], // 上标/下标
                            [{'indent': '-1'}, {'indent': '+1'}], // 缩进
                            [{'direction': 'rtl'}], // 文本方向
                            [{'size': ['small', false, 'large', 'huge']}], // 字体大小
                            [{'header': [1, 2, 3, 4, 5, 6, false]}], // 标题
                            [{'font': []}], // 字体种类
                            [{'color': []}, {'background': []}], // 字体颜色、字体背景颜色
                            [{'align': []}], // 对齐方式
                            ['clean'],// 清除文本格式
                            ['link', 'image', 'video'] // 链接、图片、视频
                        ],
                        syntax: {
                            highlight: text => hljs.highlightAuto(text).value
                        }
                    }
                },
                content: dedent``,
                showCreate: false,
                updateIndex: -1,
                creating: false,
                createData: {
                    cate_id: '',
                    post_title: '',
                    post_content: '',
                    relation_tag_ids: '',
                    relation_tag_name: '',
                    thumb_url: '',
                    link_url: '',
                    full_thumb_url: '',
                    post_excerpt: '',
                    post_source: '',
                    tag_keyword: '',
                    relation_tags_list: [],
                    is_publish: 1,
                    is_top: 0,
                    is_recommend: 0,
                    is_publish_format: true,
                    is_top_format: false,
                    is_recommend_format: false,
                    publishFormat: true,
                    status: 1,
                    statusFormat: true,
                    use_link: 0,
                    use_link_format: false,
                    publish_time: currentTime,
                    sort_order: 100
                },
                rules: {
                    cate_id: [
                        {required: true, message: '请选择文章分类', trigger: 'change'}
                    ],
                    post_title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    post_content: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                },
                uploadFormSeen: false,
                file: {},
                cateList: []
            }
        },
        methods: {
            handleCateList () {
                CategoryIndex({
                    limit: 100
                }).then(res => {
                    res.data.forEach((item, index) => {
                        item.id = item.id.toString();
                    });
                    this.cateList = res.data;
                }).finally(() => {

                });
            },
            onEditorChange: debounce(function (value) {
                this.createData.post_content = value.html
            }, 466),
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            handleOk() {
                this.createData.full_thumb_url = this.file.attach_full_url;
                this.createData.thumb_url = this.file.attach_url;
            },
            handleCancel() {
                this.uploadFormSeen = false;
            },
            handleSuccess(file) {
                this.file = file;
                console.log(file)
            },
            handleSelectImage(item, index) {
                this.file = item;
            },
            handleShowImage() {
                console.log('OK')
            },
            handleShowUpload() {
                this.uploadFormSeen = true;
            },
            handleSubmit() {
                this.$refs.create.validate((valid) => {
                    this.creating = true;
                    if (valid) {
                        if (this.updateIndex < 0) {
                            // 新建
                            PostStore(this.createData).then(async res => {
                                this.$Message.success('创建成功');
                                this.$emit('on-ok');
                            });
                        } else {
                            this.createData.id = this.updateIndex;
                            // 修改
                            PostUpdate(this.createData).then(res => {
                                this.$Message.success('修改成功');
                                this.$emit('on-ok');
                            });
                        }
                        this.creating = false;
                    } else {
                        this.creating = false;
                    }
                });
            },
            handleReset() {
                this.$refs.create.resetFields();
            },
            handleStatusSwitchChange (type) {
                switch (type) {
                    case 1:
                        this.createData.is_publish = this.createData.is_publish_format ? 1 : 0;
                        break;
                    case 2:
                        this.createData.is_top = this.createData.is_top_format ? 1 : 0;
                        break;
                    case 3:
                        this.createData.is_recommend = this.createData.is_recommend_format ? 1 : 0;
                        break;
                    case 4:
                        this.createData.use_link = this.createData.use_link_format ? 1 : 0;
                        break;
                }
            },
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            },
            contentCode() {
                return hljs.highlightAuto(this.createData.post_content).value
            }
        },
        mounted() {
            console.log('this is Quill instance:', this.editor);
            this.handleCateList();
        }
    }
</script>

<style lang="less">
    .post-add-container {
        .editor {
            .ql-toolbar {
                border: 1px solid #dcdee2 !important;
                border-bottom: 0px !important;
                border-radius: 4px 4px 0px 0px;
            }

            .ql-container {
                height: 200px;
                border: 1px solid #dcdee2 !important;
                border-radius: 0px 0px 4px 4px;
            }
        }
    }
</style>