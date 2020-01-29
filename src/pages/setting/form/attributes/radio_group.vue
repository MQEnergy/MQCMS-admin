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
                            <Tooltip max-width="200" content="内容依次为：label、value、disabled" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <RadioGroup
                                v-model="currentElement.ele_value"
                                vertical
                        >
                            <Radio
                                    v-for="(option, index) in currentElement.options"
                                    :key="index"
                                    :label="option.label"
                            >
                                <Input v-model="option.label" clearable v-width="100" />&nbsp;
                                <Input v-model="option.value" clearable v-width="80" />&nbsp;
                                <Switch v-model="option.disabled"></Switch>
                                <Button type="text" @click="handleOptionRemove(index)"><Icon v-color="'#ed4014'" type="md-close-circle" /></Button>
                            </Radio>
                        </RadioGroup>
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
                    <FormItem label="是否按钮(group_type)">
                        <RadioGroup v-model="currentElement.ele_attr.group_type">
                            <Radio label="">否</Radio>
                            <Radio label="button">是</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="额外属性">
                        <Checkbox v-model="currentElement.ele_attr.group_vertical" :true-value="true" :false-value="false">vertical</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.border" :true-value="true" :false-value="false">border</Checkbox>
                    </FormItem>
                </Card>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "attribute-radio-group",
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