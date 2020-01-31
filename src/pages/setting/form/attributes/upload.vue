<template>
    <div>
        <div v-if="currentElement">
            <Form
                ref="currentFormInline"
                :model="currentElement"
                label-position="top"
            >
                <Card dis-hover>
                    <span slot="title">基本属性</span>
                    <FormItem label="字段hash">
                        <Input disabled v-model="currentElement.ele_hash" placeholder="请输入字段标识" />
                    </FormItem>
                    <FormItem label="字段prop">
                        <Input v-model="currentElement.ele_prop" placeholder="请输入字段prop" />
                    </FormItem>
                    <FormItem label="字段标题(label)">
                        <Input v-model="currentElement.ele_title" placeholder="请输入字段标题" />
                    </FormItem>
                    <FormItem style="margin-bottom: 10px">
                        <div slot="label">
                            初始值(value)
                            <Tooltip max-width="200" content="图片初始值" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <Tooltip placement="top" theme="light" style="width: 100%" @on-popper-show="handlePopperShow">
                            <div slot="content">
                                <template v-if="currentElement.ele_attr.ele_info && currentElement.ele_attr.attach_full_url">
                                    <img v-if="currentElement.ele_attr.attach_type === 1" :src="currentElement.ele_attr.attach_full_url" style="width: 60px; height: 60px;" >
                                    <video ref="videoInfo" v-if="currentElement.ele_attr.attach_type === 2" style="width: 60px; height: 60px;" muted autoplay>
                                        <source :src="currentElement.ele_attr.attach_full_url" :type="currentElement.ele_attr.ele_info.attach_minetype">
                                        此视频暂无法播放，请稍后再试
                                    </video>
                                </template>
                                <template v-else>
                                    暂无预览
                                </template>
                            </div>
                            <Input v-model="currentElement.ele_value" placeholder="请输入初始值"/>
                        </Tooltip>
                    </FormItem>
                    <Button type="dashed" long @click="handleUploadSeen"><Icon type="md-add" /> 添加初始值</Button>
                </Card>

                <Card dis-hover style="margin-top: 15px;">
                    <span slot="title">
                        其他属性
                    </span>
                    <FormItem label="标签宽度(label-width)">
                        <InputNumber :max="200" :min="0" :step="10" v-model="currentElement.label_width" placeholder="请输入字段宽度"></InputNumber>
                    </FormItem>
                    <FormItem label="组件尺寸">
                        <RadioGroup v-model="currentElement.ele_size" @on-change="handleElementSize(1)" type="button">
                            <Radio label="default">default</Radio>
                            <Radio label="small">small</Radio>
                            <Radio label="large">large</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="按钮设置">
                        <Button type="dashed" @click="handleIconSeen">
                            <template v-if="currentElement.ele_attr.btn_icon">
                                <Icon v-if="!currentElement.ele_attr.is_custom" :type="currentElement.ele_attr.btn_icon" size="20" />
                                <Icon v-else :class="formConfig.icon.font_family" :custom="formConfig.icon.css_prefix_text + currentElement.ele_attr.btn_icon" size="20" />
                            </template>
                            <template v-else>
                                选择icon
                            </template>
                        </Button>
                        <Input v-model="currentElement.ele_attr.btn_title" placeholder="按钮名称" v-width="120" />
                    </FormItem>
                    <FormItem>
                        <div slot="label">
                            上传图片地址
                            <Tooltip max-width="200" content="查看使用帮助文档http://help.mqcms.net" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <Input v-model="formConfig.upload.upload_url" placeholder="请输入上传图片地址" />
                    </FormItem>
                    <FormItem>
                        <div slot="label">
                            获取图片列表地址
                            <Tooltip max-width="200" content="查看使用帮助文档http://help.mqcms.net" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <Input v-model="formConfig.upload.image_list_url" placeholder="请输入获取图片列表地址" />
                    </FormItem>
                    <FormItem>
                        <div slot="label">
                            删除图片地址
                            <Tooltip max-width="200" content="查看使用帮助文档http://help.mqcms.net" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <Input v-model="formConfig.upload.del_image_url" placeholder="请输入删除图片地址" />
                    </FormItem>
                    <FormItem label="额外属性">
                        <Checkbox v-model="formConfig.upload.multiple" :true-value="true" :false-value="false">
                            multiple
                            <Tooltip max-width="130" content="多图上传开关" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="formConfig.upload.is_local" :true-value="true" :false-value="false">
                            is_local
                            <Tooltip max-width="130" content="上传图片弹窗是否显示本地图片tab" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="formConfig.upload.is_stock" :true-value="true" :false-value="false">
                            is_stock
                            <Tooltip max-width="130" content="上传图片弹窗是否显示图库图片tab" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="formConfig.upload.is_net" :true-value="true" :false-value="false">
                            is_net
                            <Tooltip max-width="130" content="上传图片弹窗是否显示网络图片tab" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="formConfig.upload.show_base_upload" :true-value="true" :false-value="false">
                            show_base_upload
                            <Tooltip max-width="180" content="是否显示iview上传组件（关闭此选项需要使用slot='upload'自定义上传组件）" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                    </FormItem>
                </Card>
            </Form>
            <Modal
                    v-model="uploadSeen"
                    :title="formConfig.upload.modal_title"
                    :width="formConfig.upload.modal_width"
                    :mask-closable="formConfig.upload.modal_mask_closable"
                    @on-ok="handleModalImgOk"
                    @on-cancel="handleModalImgCancel">
                <upload-form
                        v-if="uploadSeen"
                        ref="uploadForm"
                        @on-success="handleSuccess"
                        @on-select-image="handleSelectImage"
                        :multiple="formConfig.upload.multiple"
                        :upload-url="formConfig.upload.upload_url"
                        :image-list-url="formConfig.upload.image_list_url"
                        :del-image-url="formConfig.upload.del_image_url"
                        :is-local="formConfig.upload.is_local"
                        :is-stock="formConfig.upload.is_stock"
                        :is-net="formConfig.upload.is_net"
                        :is-del="formConfig.upload.is_del"
                        :show-base-upload="formConfig.upload.show_base_upload"
                />
            </Modal>
            <Modal
                    v-model="iconSeen"
                    title="选择icon"
                    :width="formConfig.icon.modal_width"
                    :mask-closable="formConfig.icon.modal_mask_closable"
                    @on-ok="handleModalIconOk"
                    @on-cancel="handleModalIconCancel">
                <icon-index :is-custom="true" @on-choose-icon="handleChooseIcon" />
            </Modal>
        </div>
    </div>
</template>

<script>
    import UploadForm from '@/components/uploadform';
    import IconIndex from "@/components/icon/index";

    export default {
        name: "attribute-upload",
        props: {
            currentElement: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            formConfig: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            IconIndex,
            UploadForm
        },
        data () {
            return {
                uploadSeen: false,
                iconSeen: false
            }
        },
        methods: {
            handleElementSize (type) {
                this.$emit('on-element-size', type);
            },
            handleUploadSeen () {
                this.uploadSeen = true;
            },
            handleModalImgOk () {
                if (this.currentElement.ele_attr.ele_info) {
                    this.currentElement.ele_value = this.currentElement.ele_attr.ele_info.attach_url;
                    this.currentElement.ele_attr.attach_full_url = this.currentElement.ele_attr.ele_info.attach_full_url;
                    this.currentElement.ele_attr.attach_type = this.currentElement.ele_attr.ele_info.attach_type;
                }
            },
            handleModalImgCancel () {
                this.uploadSeen = false;
            },
            handleSuccess (item) {
                this.currentElement.ele_attr.ele_info = item;
            },
            handleSelectImage (item, index) {
                this.currentElement.ele_attr.ele_info = item;
            },
            handleIconSeen () {
                this.iconSeen = true;
            },
            handleModalIconOk () {
                this.currentElement.ele_attr.is_custom = this.currentIcon.is_custom;
                this.currentElement.ele_attr.btn_icon = this.currentIcon.font_class;
            },
            handleModalIconCancel () {
                this.iconSeen = false;
            },
            handleChooseIcon (item, index) {
                this.currentIcon = item;
            },
            handlePopperShow () {
                if (this.currentElement.ele_attr.attach_type === 2) {
                    this.$nextTick(() => {
                        this.$refs.videoInfo.load();
                        this.$refs.videoInfo.play();
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .ivu-radio-group-vertical .ivu-radio-wrapper {
        height: auto;
        line-height: 35px;
    }
    span.ivu-radio + * {
        margin: 0px;
    }
</style>