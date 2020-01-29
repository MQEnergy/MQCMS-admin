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
                            选项设置(custom)
                            <Tooltip max-width="200" content="如果选择span建议自定义内容少于2个汉字" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <RadioGroup
                                v-model="currentElement.ele_attr.custom.name"
                                type="button"
                                @on-change="handleRadioChange"
                        >
                            <Radio label="span">span</Radio>
                            <Radio label="icon">icon</Radio>
                        </RadioGroup>
                    </FormItem>
                    <div style="background: #f0f1f3; padding: 10px;" >
                        <FormItem label="自定义内容" style="margin-bottom: 10px;">
                            <template v-if="currentElement.ele_attr.custom.name === 'span'">
                                开启：<Input v-model="currentElement.ele_attr.custom.type[0]" v-width="100" clearable /><br>
                                关闭：<Input v-model="currentElement.ele_attr.custom.type[1]" v-width="100" clearable />
                            </template>
                            <template v-else>
                                开启：
                                <Tooltip placement="top">
                                    <div slot="content">
                                        <template v-if="currentElement.ele_attr.custom.type[0] !== '开'">
                                            <Icon v-if="!currentElement.ele_attr.custom.is_custom" :type="currentElement.ele_attr.custom.type[0]" size="30" />
                                            <Icon v-else :class="formConfig.config.icon.font_family" :custom="formConfig.config.icon.css_prefix_text + currentElement.ele_attr.custom.type[0]" size="30" />
                                        </template>
                                        <template v-else>
                                            暂无预览
                                        </template>
                                    </div>
                                    <Button type="dashed" @click="handleSelectIcon(1)">
                                        {{ currentElement.ele_attr.custom.type[0] !== '开' ? currentElement.ele_attr.custom.type[0] : '选择icon' }}
                                    </Button>
                                </Tooltip><br>
                                关闭：
                                <Tooltip placement="top">
                                    <div slot="content">
                                        <template v-if="currentElement.ele_attr.custom.type[1] !== '关'">
                                            <Icon v-if="!currentElement.ele_attr.custom.is_custom" :type="currentElement.ele_attr.custom.type[1]" size="30" />
                                            <Icon v-else :class="formConfig.config.icon.font_family" :custom="formConfig.config.icon.css_prefix_text + currentElement.ele_attr.custom.type[1]" size="30" />
                                        </template>
                                        <template v-else>
                                            暂无预览
                                        </template>
                                    </div>
                                    <Button type="dashed" @click="handleSelectIcon(2)">
                                        {{ currentElement.ele_attr.custom.type[1] !== '关' ? currentElement.ele_attr.custom.type[1] : '选择icon' }}
                                    </Button>
                                </Tooltip>
                            </template>
                        </FormItem>
                    </div>
                </Card>

                <Card dis-hover style="margin-top: 15px;">
                    <span slot="title">
                        其他属性
                         <span style="width: 150px; cursor: pointer">
                            <Tooltip max-width="150" content="这些参数与iview参数一致，不明白的可以查看iview文档" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </span>
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
                    <FormItem label="额外属性">
                        <Checkbox v-model="currentElement.ele_attr.disabled" :true-value="true" :false-value="false">disabled</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.loading" :true-value="true" :false-value="false">loading</Checkbox>
                    </FormItem>
                </Card>
            </Form>
            <Modal
                    v-model="modalSeen"
                    title="选择icon"
                    :width="formConfig.upload.modal_width"
                    :mask-closable="formConfig.upload.modal_mask_closable"
                    @on-ok="handleModalOk"
                    @on-cancel="handleModalCancel">
                <icon-index @on-choose-icon="handleChooseIcon" />
            </Modal>
        </div>
    </div>
</template>

<script>

    import IconIndex from "@/components/icon/index";
    export default {
        name: "attribute-switch",
        components: {
            IconIndex
        },
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
        data () {
            return {
                modalSeen: false,
                currentIndex: 0,
                currentIcon: {}
            }
        },
        methods: {
            handleElementSize (type) {
                this.$emit('on-element-size', type);
            },
            handleOptionRemove (index) {
                this.currentElement.options.splice(index, 1);
            },
            handleAddOption () {
                this.currentElement.options.push({
                    label: "label值",
                    value: "value值",
                    icon: "",
                    disabled: false,
                    true_value: true, // 单个radio的时候使用
                    false_value: false
                });
            },
            handleSelectIcon (index) {
                this.currentIndex = index - 1;
                this.modalSeen = true;
            },
            handleModalOk () {
                this.currentElement.ele_attr.custom.is_custom = this.currentIcon.is_custom;
                this.currentElement.ele_attr.custom.type[this.currentIndex] = this.currentIcon.font_class;
            },
            handleModalCancel () {
                this.modalSeen = false;
            },
            handleChooseIcon (item, index) {
                this.currentIcon = item;
            },
            handleRadioChange (name) {
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