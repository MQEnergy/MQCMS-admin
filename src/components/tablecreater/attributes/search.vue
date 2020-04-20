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
                    <FormItem>
                        <div slot="label">
                            搜索的url
                            <Tooltip max-width="200" content="配置搜索URL包含普通搜索和高级搜索的接口请求，搜索接口请选择如：AdminSearch 包含search的字母" placement="top-start">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <Row :gutter="2">
                            <Col :span="8">
                                <Select v-model="currentElement.ele_attr.search_action.module" v-width="'100%'" clearable @on-change="handleSearchActionChange">
                                    <Option v-for="(item, index) in apiList" :value="item.module" :label="item.module" :key="index">
                                        {{ item.module }}
                                        <Tooltip style="float:right;color:#ccc" max-width="200" :content="item.module_desc" placement="top" :transfer="true">
                                            <Icon type="md-help-circle" />
                                        </Tooltip>
                                    </Option>
                                </Select>
                            </Col>
                            <Col :span="16">
                                <template v-if="currentElement.ele_attr.search_action.data.length > 0">
                                    <Select v-model="currentElement.ele_attr.search_action.value" clearable v-width="'100%'" @on-change="handleSearchUrlChange">
                                        <Option v-for="(item, index) in currentElement.ele_attr.search_action.data"
                                                :value="item.func + '|' + item.url + '|' + item.method"
                                                :label="item.func"
                                                :key="index">
                                            <span>{{ item.func }}</span>
                                            <span style="float:right;color:#ccc">{{ item.url }}</span>
                                        </Option>
                                    </Select>
                                </template>
                            </Col>
                        </Row>
                        <Poptip word-wrap width="200" placement="top-start">
                            <div slot="content">
                                <div v-height="150" v-if="modelLoading">
                                    <Spin fix size="large"></Spin>
                                </div>
                                <div v-height="150" v-else>
                                    <template v-if="currentModel.length > 0">
                                        {{ currentModel }}
                                    </template>
                                    <template v-else>
                                        <empty-list empty-text="暂无数据" :is-back="false" />
                                    </template>
                                </div>
                            </div>
                            <Button class="ivu-mt-8" v-if="currentElement.ele_attr.search_action.module" type="primary" @click="handleModuleTableClick">
                                获取数据字段数据
                                <Tooltip max-width="200" placement="top">
                                    <div slot="content" v-width="100">
                                        点击此选项可方便查看字段值，且在搜索配置中选择字段值
                                    </div>
                                    <Icon type="md-help-circle" />
                                </Tooltip>
                            </Button>
                        </Poptip>
                    </FormItem>
                    <FormItem>
                        <div slot="label">
                            基础搜索配置
                            <Tooltip max-width="200" content="这是select的选项参数，依次是：name（选项名称）value（选项值）,value与数据表字段一致" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <div style="background: #f0f1f3; padding: 10px;">
                            <div v-for="(item, index) in currentElement.ele_attr.base_search_form.options">
                                <Row>
                                    <Col :span="20">
                                        <div class="ivu-fl">
                                            <Input v-model="item.name" placeholder="name" clearable v-width="100" />&nbsp;
                                            <AutoComplete
                                                    v-model="item.value"
                                                    :filter-method="handleBaseAutoFilter"
                                                    placeholder="value"
                                                    clearable
                                                    v-width="100">
                                                <div v-height="200">
                                                    <Option v-for="(val, key) in currentModel" :value="val" :key="key">{{ val }}</Option>
                                                </div>
                                            </AutoComplete>
                                        </div>
                                    </Col>
                                    <Col :span="4">
                                        <div class="ivu-fr">
                                            <Icon v-color="'#ed4014'" type="md-close-circle" @click="handleOptionRemove(index)" style="cursor: pointer;"/>
                                            <Dropdown placement="bottom-end" class="ivu-ml-8" @on-click="handleBasicActionDropdownMenu($event, item, index)">
                                                <a href="javascript:void(0)">
                                                    <Icon type="md-more" />
                                                </a>
                                                <DropdownMenu slot="list">
                                                    <DropdownItem name="copy" >向下复制</DropdownItem>
                                                    <DropdownItem name="init" >设为初始值</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Button class="ivu-mt-8" type="dashed" long @click="handleAddOption"><Icon type="md-add" /> 新增搜索项</Button>
                        </div>
                    </FormItem>
                    <FormItem style="margin-bottom: 10px">
                        <div slot="label">
                            高级搜索配置
                            <Tooltip max-width="200" content="参数依次是：label_name(label名称), label_prop(label的prop，与数据库搜索字段一致), ele_type(iview组件类型), options(在元素类型为select，switch下使用)" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </div>
                        <div style="background: #f0f1f3; padding: 10px;">
                            <div v-for="(item, index) in currentElement.ele_attr.advanced_search_form" :key="index">
                                <Row>
                                    <Col :span="20">
                                        <div class="ivu-fl">
                                            <Input v-model="item.label_name" placeholder="label_name" clearable v-width="100" />&nbsp;
<!--                                            <Input v-model="item.label_prop" placeholder="label_prop" clearable v-width="100" />&nbsp;-->
                                            <AutoComplete
                                                    v-model="item.label_prop"
                                                    :filter-method="handleBaseAutoFilter"
                                                    placeholder="label_prop"
                                                    clearable
                                                    v-width="100">
                                                <div v-height="200">
                                                    <Option v-for="(val, key) in currentModel" :value="val" :key="key">{{ val }}</Option>
                                                </div>
                                            </AutoComplete>
                                            <Select v-model="item.ele_type" v-width="100" @on-change="handleAdvancedTypeChange($event, item, index)">
                                                <Option value="input">input</Option>
                                                <Option value="select">select</Option>
                                                <Option value="switch">switch</Option>
                                                <Option value="date">date</Option>
                                                <Option value="datetime">datetime</Option>
                                                <Option value="daterange">daterange</Option>
                                                <Option value="datetimerange">datetimerange</Option>
                                                <Option value="year">year</Option>
                                                <Option value="month">month</Option>
                                            </Select>
                                        </div>
                                    </Col>
                                    <Col :span="4">
                                        <div class="ivu-fr">
                                            <Icon v-color="'#ed4014'" type="md-close-circle" @click="handleActionRemove(index)" style="cursor: pointer;"/>
                                            <Dropdown placement="bottom-end" class="ivu-ml-8" @on-click="handleAdvancedActionDropdownMenu($event, item, index)">
                                                <a href="javascript:void(0)">
                                                    <Icon type="md-more" />
                                                </a>
                                                <DropdownMenu slot="list">
                                                    <DropdownItem name="copy">向下复制</DropdownItem>
                                                    <DropdownItem name="other-params-select" v-if="item.ele_type === 'select'">设置选项</DropdownItem>
                                                    <DropdownItem name="other-params-switch" v-if="item.ele_type === 'switch'">设置属性</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </Col>
                                </Row>
                                <div v-if="item.options.length > 0" style="background: #dfe3e8; padding: 10px; margin: 5px 0;">
                                    <template v-if="item.ele_type === 'select'">
                                        <div v-for="(val, key) in item.options" :key="key">
                                            选项{{ key + 1 }}：
                                            <Input v-model="val.name" placeholder="name" clearable v-width="100" />&nbsp;
                                            <Input v-model="val.value" placeholder="value" clearable v-width="100" />&nbsp
                                            <div class="ivu-fr">
                                                <Icon v-color="'#ed4014'" type="md-close-circle" @click="handleAdvancedActionOptionsRemove(item.options, key)" style="cursor: pointer;"/>
                                                <Dropdown placement="bottom-end" class="ivu-ml-8" @on-click="handleAdvancedActionOptionsDropdownMenu($event, index, val, key)">
                                                    <a href="javascript:void(0)">
                                                        <Icon type="md-more" />
                                                    </a>
                                                    <DropdownMenu slot="list">
                                                        <DropdownItem name="copy">向下复制</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="item.ele_type === 'switch'">
                                        开启：
                                        <Input v-model="item.options[0].open" placeholder="open" clearable v-width="100" />&nbsp;
                                        <Input v-model="item.options[0].true_value" placeholder="true_value" clearable v-width="100" /><br>
                                        关闭：
                                        <Input v-model="item.options[0].close" placeholder="close" clearable v-width="100" />&nbsp;
                                        <Input v-model="item.options[0].false_value" placeholder="false_value" clearable v-width="100" /><br>
                                    </template>
                                </div>
                            </div>
                            <Button class="ivu-mt-8" type="dashed" long @click="handleAddAction"><Icon type="md-add" /> 新增搜索项</Button>
                        </div>
                    </FormItem>
                </Card>

                <Card dis-hover style="margin-top: 15px;">
                    <span slot="title">
                        其他属性
                         <span style="width: 150px; cursor: pointer">
                            <Tooltip max-width="160" content="查看文档地址：http://help.mqcms.net" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </span>
                    </span>
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
                        <Checkbox v-model="currentElement.ele_attr.show_refresh" :true-value="true" :false-value="false">
                            show_refresh
                            <Tooltip min-width="180" max-width="180" content="设置展示刷新按钮，需配合@on-search事件使用" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.show_export" :true-value="true" :false-value="false">
                            show_export
                            <Tooltip min-width="180" max-width="180" content="设置展示导出按钮，需配合@on-export事件使用" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.show_import" :true-value="true" :false-value="false">
                            show_import
                            <Tooltip min-width="180" max-width="180" content="设置展示导入按钮，需配合@on-import事件使用" placement="top" :transfer="true">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.show_create" :true-value="true" :false-value="false">
                            show_create
                            <Tooltip min-width="180" max-width="180" content="设置展示新建按钮，需配合@on-create-form事件使用" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.show_advanced" :true-value="true" :false-value="false">
                            show_advanced
                            <Tooltip min-width="180" max-width="180" content="设置展示高级搜索功能" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <Checkbox v-model="currentElement.ele_attr.show_multi_action" :true-value="true" :false-value="false">
                            show_multi_action
                            <Tooltip max-width="200" content="设置更多操作按钮，内容依次为：name、value，name代表更多操作的选项名称，value代表操作的emit，调用父组件方法传递数据（尽量名称以on-开头），需配合@on-事件使用" placement="top">
                                <Icon type="md-help-circle" />
                            </Tooltip>
                        </Checkbox>
                        <div style="background: #f0f1f3; padding: 10px;" v-if="currentElement.ele_attr.show_multi_action">
                            <div v-for="(item, index) in currentElement.ele_attr.multi_actions">
                                <Row>
                                    <Col :span="20">
                                        <div class="ivu-fl">
                                            <Input v-model="item.name" placeholder="name" clearable v-width="120" />&nbsp;
                                            <Input v-model="item.value" placeholder="value" clearable v-width="120" />&nbsp;
                                        </div>
                                    </Col>
                                    <Col :span="4">
                                        <div class="ivu-fr">
                                            <Icon v-color="'#ed4014'" type="md-close-circle" @click="handleMultiActionRemove(index)" style="cursor: pointer;"/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <Button style="margin-top: 10px;" type="dashed" long @click="handleAddMultiAction"><Icon type="md-add" /> 新增选择项</Button>
                        </div>
                    </FormItem>
                </Card>
            </Form>
        </div>
    </div>
</template>

<script>
    import dataJson from '@/api/index';
    import { AdminModule } from "@api/permission/admin";
    import EmptyList from "@/components/common/empty";

    export default {
        name: "attribute-search",
        components: {EmptyList},
        props: {
            currentElement: {
                type: Object,
                default () {
                    return {};
                }
            },
            formConfig: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                apiList: dataJson.searchList,
                modelLoading: false,
                currentModel: []
            }
        },
        methods: {
            handleElementSize (type) {
                this.$emit('on-element-size', type);
            },
            handleSearchActionChange (value) {
                const currentAction = this.apiList.filter(item => {
                    return item.module === value;
                });
                this.formConfig.search.search_action.module = currentAction.length > 0 ? currentAction[0].module : '';
                this.currentElement.ele_attr.search_action.module = currentAction.length > 0 ? currentAction[0].module : '';
                this.currentElement.ele_attr.search_action.data = currentAction.length > 0 ? currentAction[0].data : [];
            },
            handleOptionRemove (index) {
                this.currentElement.ele_attr.base_search_form.options.splice(index, 1);
            },
            handleAddOption () {
                const options = this.handleInitOptions('base');
                this.currentElement.ele_attr.base_search_form.options.push(options);
            },
            handleAdvancedTypeChange (event, item, index) {
                item.options = [];
                const options = this.handleInitOptions(event, item.options);
                item.options = options;
            },
            handleActionRemove (index) {
                this.currentElement.ele_attr.advanced_search_form.splice(index, 1);
            },
            handleAddAction () {
                const options = this.handleInitOptions('advanced');
                this.currentElement.ele_attr.advanced_search_form.push(options);
            },
            handleMultiActionRemove (index) {
                this.currentElement.ele_attr.multi_actions.splice(index, 1);
            },
            handleAddMultiAction () {
                const options = this.handleInitOptions('multi_actions');
                this.currentElement.ele_attr.multi_actions.push(options);
            },
            handleBasicActionDropdownMenu (event, item, index) {
                if (event === 'copy') {
                    this.handleDeepCloneSplice(this.currentElement.ele_attr.base_search_form.options, item, index);

                } else if (event === 'init') {
                    this.currentElement.ele_attr.base_search_form.type = item.value;
                }
            },
            handleAdvancedActionDropdownMenu (event, item, index) {
                if (event === 'copy') {
                    this.handleDeepCloneSplice(this.currentElement.ele_attr.advanced_search_form, item, index);
                } else if (event === 'other-params-select') {
                    item.options = this.handleInitOptions('select', item.options);

                } else if (event === 'other-params-switch') {
                    item.options = this.handleInitOptions('switch', item.options);
                }
            },
            handleDeepCloneSplice (list, item, index) {
                const value = JSON.parse(JSON.stringify(item));
                list.splice(index, 0, value);
            },
            handleAdvancedActionOptionsRemove (list, index) {
                list.splice(index, 1);
            },
            handleAdvancedActionOptionsDropdownMenu ($event, index, item, key) {
                const value = JSON.parse(JSON.stringify(item));
                this.currentElement.ele_attr.advanced_search_form[index].options.splice(key, 0, value);
            },
            handleInitOptions (type, item=[]) {
                let options;
                switch (type) {
                    case 'select':
                        if (item.length === 0) {
                            options = [{
                                name: '',
                                value: ''
                            }];
                        }
                        break;
                    case 'switch':
                        if (item.length === 0) {
                            options = [{
                                open: '开',
                                true_value: "true",
                                close: '关',
                                false_value: "false"
                            }];
                        }
                        break;
                    case 'base':
                        options = {
                            name: '',
                            value: ''
                        };
                        break;
                    case 'advanced':
                        options = {
                            label_name: 'label_name',
                            label_prop: 'label_prop',
                            ele_value: '',
                            ele_type: 'input',
                            options: []
                        };
                        break;
                    case 'multi_actions':
                        options = {
                            name: '',
                            value: ''
                        };
                        break;
                    case 'date':
                    case 'datetime':
                    case 'daterange':
                    case 'datetimerange':
                    case 'year':
                    case 'month':
                        options = {};
                        break;
                    default:
                        options = [];
                        break;
                }
                return options;
            },
            handleModuleTableClick () {
                this.modelLoading = true;
                this.currentModel = [];
                AdminModule({
                    module: this.currentElement.ele_attr.search_action.module
                }).then(res => {
                    this.currentModel = res;
                }).catch(err => {
                }).finally(() => {
                    this.modelLoading = false;
                });
            },
            handleBaseAutoFilter (value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            handleSearchUrlChange (value) {
                this.formConfig.search.search_action.value = value;
            }
        }
    }
</script>

<style scoped>

</style>