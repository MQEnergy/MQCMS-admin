<template>
    <div>
        <Tooltip placement="right-start" theme="light" @on-popper-show="handlePopperShow">
            <div slot="content">
                <template v-if="element.ele_attr.ele_info && element.ele_attr.attach_full_url">
                    <img v-if="element.ele_attr.attach_type === 1" :src="element.ele_attr.attach_full_url" style="width: 60px; height: 60px;" >
                    <template v-if="element.ele_attr.attach_type === 2">
                        <video ref="videoInfo" style="width: 60px; height: 60px;" muted autoplay>
                            <source :src="element.ele_attr.attach_full_url" :type="element.ele_attr.attach_minetype">
                            此视频暂无法播放，请稍后再试
                        </video>
                    </template>
                </template>
                <template v-else>
                    暂无预览
                </template>
            </div>
            <Button :class="element.custom_class" :size="element.ele_size" v-width="element.ele_width" @click="handleUploadSeen">
                <Icon v-if="!element.ele_attr.is_custom" :type="element.ele_attr.btn_icon" size="16" />
                <Icon v-else :class="formConfig.icon.font_family" :custom="formConfig.icon.css_prefix_text + element.ele_attr.btn_icon" size="16" />
                {{ element.ele_attr.btn_title }}
            </Button>
        </Tooltip>
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
                    current-tab="stock"
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
    </div>
</template>

<script>
    import UploadForm from "@/components/uploadform/index";

    export default {
        name: "component-upload",
        components: {UploadForm},
        props: {
            element: {
                type: Object,
                default: {}
            },
            index: {
                type: Number,
                default: 0
            },
            formConfig: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                currentElement: this.element,
                currentIndex: this.index,
                uploadSeen: false
            }
        },
        methods: {
            handlePopperShow () {
                if (this.element.ele_attr.attach_type === 2) {
                    this.$nextTick(() => {
                        if (this.$refs.videoInfo) {
                            this.$refs.videoInfo.load();
                            this.$refs.videoInfo.play();
                        }
                    });
                }
            },
            handleUploadSeen () {
                this.uploadSeen = true;
            },
            handleModalImgOk () {
                if (this.currentElement.ele_attr.ele_info) {
                    this.currentElement.ele_value = this.currentElement.ele_attr.ele_info.attach_url;
                    this.currentElement.ele_attr.attach_full_url = this.currentElement.ele_attr.ele_info.attach_full_url;
                    this.currentElement.ele_attr.attach_type = this.currentElement.ele_attr.ele_info.attach_type;
                    this.currentElement.ele_attr.attach_minetype = this.currentElement.ele_attr.ele_info.attach_minetype;
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
        }
    }
</script>

<style scoped>

</style>