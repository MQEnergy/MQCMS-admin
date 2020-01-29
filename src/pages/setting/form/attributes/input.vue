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
                            <Option value="text">text</Option>
                            <Option value="textarea">textarea</Option>
                            <Option value="password">password</Option>
                            <Option value="number">number</Option>
                            <Option value="url">url</Option>
                            <Option value="email">email</Option>
                            <Option value="date">date</Option>
                            <Option value="tel">tel</Option>
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
                        <Checkbox v-model="currentElement.ele_attr.show_word_limit" :true-value="true" :false-value="false">
                            show-word-limit
                            <Tooltip max-width="130" content="是否显示输入字数统计，勾选此选项建议去除clearable选项" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <div style="background: #f0f1f3; padding: 10px;" v-if="currentElement.ele_attr.show_word_limit" >
                            限制字数：<InputNumber :min="0" :step="10" v-model="currentElement.ele_attr.maxlength"  placeholder="输入最大长度"></InputNumber>
                        </div>

                        <Checkbox v-if="currentElement.ele_attr.type === 'password'" v-model="currentElement.ele_attr.password" :true-value="true" :false-value="false">
                            password
                            <Tooltip max-width="130" content="是否显示切换密码图标" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-if="currentElement.ele_attr.type === 'text'" v-model="currentElement.ele_attr.search" :true-value="true" :false-value="false">
                            search
                            <Tooltip max-width="130" content="是否显示为搜索型输入框，配合enter-button参数" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <div style="background: #f0f1f3; padding: 10px;" v-if="currentElement.ele_attr.search">
                            <Checkbox v-model="currentElement.ele_attr.enter_button" :true-value="true" :false-value="false">enter-button</Checkbox>
                        </div>
                        <Checkbox v-if="currentElement.ele_attr.type === 'textarea'" v-model="currentElement.ele_attr.autosize" :true-value="true" :false-value="false">autosize</Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.number" :true-value="true" :false-value="false">
                            number
                            <Tooltip max-width="130" content="将用户的输入转换为 Number 类型" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.autofocus" :true-value="true" :false-value="false">
                            autofocus
                            <Tooltip max-width="130" content="自动获取焦点" placement="top">
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
        name: "attribute-input",
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