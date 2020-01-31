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
                    <FormItem label="字段标题">
                        <Input v-model="currentElement.ele_value" placeholder="请输入字段标题" />
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
                    <FormItem label="组件尺寸">
                        <RadioGroup v-model="currentElement.ele_size" @on-change="handleElementSize(1)" type="button">
                            <Radio label="default">default</Radio>
                            <Radio label="small">small</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="自定义class">
                        <Input v-model="currentElement.custom_class" placeholder="请输入自定义class" />
                    </FormItem>
                    <FormItem label="分割线标题的位置">
                        <RadioGroup v-model="currentElement.ele_attr.orientation" type="button">
                            <Radio label="left">left</Radio>
                            <Radio label="center">center</Radio>
                            <Radio label="right">right</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="标题颜色">
                        <ColorPicker placement="top-start" v-model="currentElement.ele_attr.color" :colors="currentElement.ele_attr.colors"/>
                    </FormItem>
                    <FormItem label="水平还是垂直类型">
                        <RadioGroup v-model="currentElement.ele_attr.type" type="button">
                            <Radio label="horizontal">horizontal</Radio>
                            <Radio label="vertical">vertical</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="额外属性">
                        <Checkbox v-model="currentElement.ele_attr.dashed" :true-value="true" :false-value="false">dashed</Checkbox>
                    </FormItem>
                </Card>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "attribute-divider",
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