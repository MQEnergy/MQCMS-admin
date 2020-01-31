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
                    <FormItem label="初始值(value)">
                        <InputNumber :max="currentElement.ele_attr.count" :min="0" :step="currentElement.ele_attr.allow_half ? 0.5 : 1" v-model="currentElement.ele_value" placeholder="请输入初始值"></InputNumber>
                    </FormItem>
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
                    <FormItem label="star总数">
                        <InputNumber :max="20" :min="3" :step="1" v-model="currentElement.ele_attr.count" placeholder="请输入star总数"></InputNumber>
                    </FormItem>
                    <FormItem>
                        <div slot="label">
                            自定义样式设置
                            <Tooltip max-width="200" content="设置评分的自定义样式" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <RadioGroup
                                v-model="currentElement.ele_attr.rate_type"
                                type="button"
                                @on-change="handleRadioChange"
                        >
                            <Radio label="icon">自定义图标</Radio>
                            <Radio label="character">
                                自定义字符
                                <Tooltip min-width="200" content="建议一个字符" placement="top">
                                    <Icon type="md-help-circle" />
                                </Tooltip>
                            </Radio>
                        </RadioGroup>
                        <div v-if="currentElement.ele_attr.rate_type" style="background: #f0f1f3; padding: 10px; margin-top: 10px;" >
                            <Input v-if="currentElement.ele_attr.rate_type === 'character'" v-model="currentElement.ele_attr.rate_custom" placeholder="请输入自定义字符" clearable />
                            <template v-if="currentElement.ele_attr.rate_type === 'icon'">
                                <Tooltip placement="top">
                                    <div slot="content">
                                        <template v-if="currentElement.ele_attr.rate_custom">
                                            <Icon v-if="!currentElement.ele_attr.is_custom" :type="currentElement.ele_attr.rate_custom" size="30" />
                                            <Icon v-else :class="formConfig.icon.font_family" :custom="formConfig.icon.css_prefix_text + currentElement.ele_attr.rate_custom" size="30" />
                                        </template>
                                        <template v-else>
                                            暂无预览
                                        </template>
                                    </div>
                                    <Button type="dashed" @click="handleSelectIcon">
                                        {{ currentElement.ele_attr.rate_custom ? currentElement.ele_attr.rate_custom : '选择icon' }}
                                    </Button>
                                </Tooltip>
                            </template>
                        </div>
                    </FormItem>
                    <FormItem label="额外属性">
                        <Checkbox v-model="currentElement.ele_attr.clearable" :true-value="true" :false-value="false">clearable</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.disabled" :true-value="true" :false-value="false">disabled</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.allow_half" :true-value="true" :false-value="false">
                            allow_half
                            <Tooltip max-width="130" content="是否允许半选" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.show_text" :true-value="true" :false-value="false">
                            show_text
                            <Tooltip max-width="130" content="是否显示提示文字" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                    </FormItem>
                </Card>
            </Form>
            <Modal
                    v-model="iconSeen"
                    title="选择icon"
                    :width="formConfig.icon.modal_width"
                    :mask-closable="formConfig.icon.modal_mask_closable"
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
        name: "attribute-rate",
        components: {IconIndex},
        props: {
            currentElement: {
                type: Object,
                default () {
                    return {}
                }
            },
            formConfig: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data () {
            return {
                iconSeen: false,
                currentIcon: {}
            }
        },
        methods: {
            handleElementSize (type) {
                this.$emit('on-element-size', type);
            },
            handleSelectIcon () {
                this.iconSeen = true;
            },
            handleModalOk () {
                this.currentElement.ele_attr.is_custom = this.currentIcon.is_custom;
                this.currentElement.ele_attr.rate_custom = this.currentIcon.font_class;
            },
            handleModalCancel () {
                this.iconSeen = false;
            },
            handleChooseIcon (item, index) {
                this.currentIcon = item;
            },
            handleRadioChange (name) {
                this.currentElement.ele_attr.rate_custom = '';
                this.currentElement.ele_attr.is_custom = false;
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