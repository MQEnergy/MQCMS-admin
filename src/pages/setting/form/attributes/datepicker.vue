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
                    <FormItem label="组件类型(type)">
                        <Select v-model="currentElement.ele_attr.type">
                            <Option value="date">date</Option>
                            <Option value="daterange">daterange</Option>
                            <Option value="datetime">datetime</Option>
                            <Option value="datetimerange">datetimerange</Option>
                            <Option value="year">year</Option>
                            <Option value="month">month</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="行数" v-if="currentElement.ele_attr.type === 'textarea'">
                        <InputNumber :max="20" :min="0" :step="1" v-model="currentElement.ele_attr.rows"  placeholder="文本域默认行数"></InputNumber>
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
                    <FormItem label="初始值(value)">
                        <Input v-model="currentElement.ele_value" placeholder="请输入初始值" />
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
                        <InputNumber :max="200" :min="0" :step="10" v-model="currentElement.label_width"  placeholder="请输入字段宽度"></InputNumber>
                    </FormItem>
                    <FormItem label="组件尺寸">
                        <RadioGroup v-model="currentElement.ele_size" @on-change="handleElementSize(1)" type="button">
                            <Radio label="default">default</Radio>
                            <Radio label="small">small</Radio>
                            <Radio label="large">large</Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem label="额外属性">
                        <Checkbox v-model="currentElement.ele_attr.clearable" :true-value="true" :false-value="false">clearable</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.disabled" :true-value="true" :false-value="false">disabled</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.readonly" :true-value="true" :false-value="false">readonly</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.split_panels" :true-value="true" :false-value="false">split_panels</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.multiple" :true-value="true" :false-value="false">multiple</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.show_week_numbers" :true-value="true" :false-value="false">show_week_numbers</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.confirm" :true-value="true" :false-value="false">confirm</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.editable" :true-value="true" :false-value="false">editable</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.transfer" :true-value="true" :false-value="false">transfer</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.capture" :true-value="true" :false-value="false">capture</Checkbox>
                    </FormItem>
                </Card>
            </Form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "attribute-datepicker",
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