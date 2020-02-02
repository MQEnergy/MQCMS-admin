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
                    <FormItem label="占位内容(placeholder)">
                        <Input v-model="currentElement.ele_attr.placeholder" placeholder="请输入占位内容" />
                    </FormItem>
                    <FormItem style="margin-bottom: 10px">
                        <div slot="label">
                            选项设置(options)
                            <Tooltip max-width="180" placement="top">
                                <Icon type="md-help-circle" />
                                <div slot="content" style="white-space: normal;">
                                    内容依次为：label、value、tag、desc、disabled，tag值在选择multiple时候显示
                                </div>
                            </Tooltip>
                        </div>
                        <RadioGroup
                                @on-change="handleRadioGroupChange"
                                v-if="!currentElement.ele_attr.multiple"
                                v-model="currentElement.ele_value"
                                vertical
                        >
                            <Radio
                                    v-for="(option, index) in currentElement.options"
                                    :key="index"
                                    :label="option.value"
                            >
                                <Input v-model="option.label" placeholder="label" clearable v-width="80" />&nbsp;
                                <Input v-model="option.value" placeholder="value" clearable v-width="80" />&nbsp;
                                <Input v-model="option.desc" placeholder="desc" clearable v-width="80" />&nbsp;
                                <Switch v-model="option.disabled"></Switch>
                                <Button type="text" @click="handleOptionRemove(index)"><Icon v-color="'#ed4014'" type="md-close-circle" /></Button>
                            </Radio>
                        </RadioGroup>
                        <CheckboxGroup
                                v-else
                                v-model="currentElement.ele_value"
                                vertical
                        >
                            <Checkbox
                                    v-for="(option, index) in currentElement.options"
                                    :key="index"
                                    :label="option.value"
                            >
                                <Input v-model="option.label" placeholder="label" clearable v-width="80" />&nbsp;
                                <Input v-model="option.value" placeholder="value" clearable v-width="80" />&nbsp;
                                <Input v-model="option.tag" placeholder="tag" clearable v-width="80" />&nbsp;
                                <Input v-model="option.desc" placeholder="desc" clearable v-width="80" />&nbsp;
                                <Switch v-model="option.disabled"></Switch>
                                <Button type="text" @click="handleOptionRemove(index)"><Icon v-color="'#ed4014'" type="md-close-circle" /></Button>
                            </Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <Button type="dashed" long @click="handleAddOption"><Icon type="md-add" /> 新增选择项</Button>
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
                    <FormItem label="自定义class">
                        <Input v-model="currentElement.custom_class" placeholder="请输入自定义class" />
                    </FormItem>
                    <FormItem label="额外属性">
                        <Checkbox v-model="currentElement.ele_attr.clearable" :true-value="true" :false-value="false" @on-change="handleClearableChange">clearable</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.multiple" :true-value="true" :false-value="false" @on-change="handleMultipleChange">multiple</Checkbox>
                        <div style="background: #f0f1f3; padding: 10px;" v-if="currentElement.ele_attr.multiple">
                            多选时最多显示：
                            <InputNumber :max="100" :min="0" :step="1" v-model="currentElement.ele_attr.max_tag_count" placeholder="多选时最多显示多少个tag"></InputNumber>
                            <br>隐藏tag时显示的内容：
                            <Input v-model="currentElement.ele_attr.max_tag_placeholder" placeholder="隐藏tag时显示的内容，参数是剩余项数量" />
                        </div>
                        <Checkbox v-model="currentElement.ele_attr.disabled">disabled</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.filterable">filterable</Checkbox>
                        <div style="background: #f0f1f3; padding: 10px;" v-if="currentElement.ele_attr.filterable">
                            无匹配数据显示内容：
                            <Input v-model="currentElement.ele_attr.not_found_text" placeholder="当下拉列表为空时显示的内容" />
                            <Checkbox v-model="currentElement.ele_attr.allow_create" :true-value="true" :false-value="false">allow_create</Checkbox>
                        </div>
                        <Checkbox v-model="currentElement.ele_attr.remote">
                            remote
                            <Tooltip min-width="180" max-width="180" content="是否使用远程搜索" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <div style="background: #f0f1f3; padding: 10px;" v-if="currentElement.ele_attr.remote">
                            <Checkbox v-model="currentElement.ele_attr.loading" :true-value="true" :false-value="false">loading</Checkbox>
                            <div v-if="currentElement.ele_attr.loading">
                                文字提示：
                                <Input v-model="currentElement.ele_attr.loading_text" placeholder="远程搜索中的文字提示" />
                            </div>
<!--                            <FormItem label="label值">-->
<!--                                <Input v-model="currentElement.ele_attr.label" placeholder="仅在remote模式下，初始化时使用" />-->
<!--                            </FormItem>-->
                        </div>
                        <Checkbox v-model="currentElement.ele_attr.label_in_value" :true-value="true" :false-value="false">
                            label_in_value
                            <Tooltip min-width="180" max-width="180" content="在返回选项时，是否将 label 和 value 一并返回，默认只返回 value" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.transfer" :true-value="true" :false-value="false">
                            transfer
                            <Tooltip min-width="180" max-width="180" content="是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <div style="background: #f0f1f3; padding: 10px;" v-if="currentElement.ele_attr.transfer">
                            添加额外class：
                            <Input v-model="currentElement.ele_attr.loading_text" placeholder="给浮层添加额外的class名称" />
                        </div>
                        <Checkbox v-model="currentElement.ele_attr.capture" :true-value="true" :false-value="false">
                            capture
                            <Tooltip max-width="130" content="是否开启capture模式，也可通过全局配置" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                    </FormItem>
                </Card>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "attribute-select",
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

            }
        },
        methods: {
            handleElementSize (type) {
                this.$emit('on-element-size', type);
            },
            handleAddOption () {
                this.currentElement.options.push({
                    label: "label值",
                    value: "value值",
                    desc: "",
                    disabled: false,
                    tag: "tag值"
                });
            },
            handleClearableChange () {
                this.currentElement.ele_attr.multiple = false;
                this.currentElement.ele_value = '';
            },
            handleMultipleChange (value) {
                this.currentElement.ele_value = value ? [] : '';
                this.currentElement.ele_attr.clearable = false;
            },
            handleOptionRemove (index) {
                this.currentElement.options.splice(index, 1);
            },
            handleRadioGroupChange (value) {
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