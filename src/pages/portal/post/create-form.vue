<template>
    <div>
        <Drawer
            title="发布编辑帖子"
            v-model="showCreate"
            placement="right"
            width="80%"
            :mask-closable="false"
            :styles="styles">
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
                                    <FormItem prop="use_link">
                                        <div slot="label">
                                            <span>标题外链</span>&nbsp;
                                            <Checkbox v-model="createData.use_link_format" @on-change="handleStatusSwitchChange(4)"></Checkbox>
                                        </div>
                                        <Input v-model="createData.link_url" placeholder="请输入标题外链"/>
                                    </FormItem>
                                    <FormItem label="发布日期" prop="publish_time">
                                        <DatePicker v-model="createData.publish_time" @on-change="handleDatePickerChange" type="datetime" placeholder="选择日期" style="width: 100%"></DatePicker>
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
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="handleCancel">取消</Button>
                <Button type="primary" :loading="creating" @click="handleSubmit">提交</Button>
            </div>
        </Drawer>
        <Modal
                v-model="uploadFormSeen"
                title="选择图片"
                width="800"
                :mask-closable="false"
                @on-ok="handleOk"
                @on-cancel="handleModalCancel">
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
    import {PostShow, PostUpdate} from "@api/post";
    import {CategoryIndex} from "@api/category";

    export default {
        name: 'create-form',
        components: {
            UploadForm,
            quillEditor
        },
        data () {
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
                    cate_id: 0,
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
                    status: 1,
                    statusFormat: true,
                    use_link: 0,
                    use_link_format: false,
                    publish_time: '',
                    sort_order: 100
                },
                rules: {
                    cate_id: [
                        {required: true, type: 'integer', message: '请选择文章分类', trigger: 'change'}
                    ],
                    post_title: [
                        {required: true, message: '请输入标题', trigger: 'blur'}
                    ],
                    post_content: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                },
                info: {},
                uploadFormSeen: false,
                file: {},
                cateList: []
            }
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
                }).finally(() => {
                    this.creating = false;
                })
            },
            handleCancel () {
                this.$refs.create.resetFields();
                this.showCreate = false;
                // this.$emit('on-create-form', false, -1);
            },
            handleCateList () {
                CategoryIndex({
                    limit: 100
                }).then(res => {
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
            handleModalCancel() {
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
                        this.createData.id = this.updateIndex;
                        // 修改
                        PostUpdate(this.createData).then(res => {
                            this.$Message.success('修改成功');
                            this.$emit('on-ok');
                            this.$nextTick(() => {
                                this.showCreate = false;
                            });
                        });
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
            handleDatePickerChange (date) {
                this.createData.publish_time = date;
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
