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
                            选项设置(options)
                            <Tooltip max-width="200" content="内容依次为：label、disabled" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <CheckboxGroup
                                v-model="currentElement.ele_value"
                                vertical
                        >
                            <Checkbox
                                    v-for="(option, index) in currentElement.options"
                                    :key="index"
                                    :label="option.label"
                            >
                                <Input v-model="option.label" clearable v-width="100" />&nbsp;
                                <Switch v-model="option.disabled"></Switch>&nbsp;
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
                        <Checkbox v-model="currentElement.ele_attr.indeterminate" :true-value="true" :false-value="false">indeterminate</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.border" :true-value="true" :false-value="false">border</Checkbox>
                    </FormItem>
                </Card>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "attribute-checkbox-group",
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

            }
        },
        methods: {
            handleElementSize (type) {
                this.$emit('on-element-size', type);
            },
            handleAddOption () {
                this.currentElement.options.push({
                    label: "label值",
                    icon: '',
                    disabled: false,
                    true_value: true, // 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
                    false_value: false // 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
                });
            },
            handleOptionRemove (index) {
                this.currentElement.options.splice(index, 1);
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