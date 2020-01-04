<template>
    <div>
        <Form ref="searchForm" :model="searchForm" :label-width="labelWidth" :label-position="labelPosition">
            <Row>
                <Col v-bind="gridLeft">
                    <FormItem :label-width="0">
                        <Input v-model="baseSearchForm.keyword" placeholder="请输入查询内容" style="float: left; max-width: 500px">
                            <Select v-model="baseSearchForm.type" slot="prepend" style="width: 100px">
                                <Option v-for="(item, index) in baseSearchForm.options" :key="index" :value="item.value">{{ item.name }}</Option>
                            </Select>
                            <Button type="primary" slot="append" @click="handleSubmit" icon="ios-search">查询</Button>
                        </Input>
                        <Button v-if="showAdvanced" style="float: left" type="text" v-color="'#2d8cf0'" @click="collapse = !collapse">
                            {{ collapse ? '普通搜索' : '高级搜索' }}<Icon :type="collapse ? 'ios-arrow-up' : 'ios-arrow-down'" />
                        </Button>
                    </FormItem>
                </Col>
                <Col v-bind="grid" class="ivu-text-right">
                    <FormItem :label-width="0">
                        <Button v-if="showCreate" class="ivu-ml-8" type="primary" icon="md-add" @click="handleOpenCreate">新建</Button>
                        <Button v-if="showExport" class="ivu-ml-8" type="primary" icon="md-download" @click="handleExport">导出</Button>
                        <Dropdown v-if="showMultiDel" class="ivu-ml-8">
                            <Button>
                                更多操作
                                <Icon type="ios-arrow-down" />
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="delete">批量删除</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </FormItem>
                </Col>
            </Row>
            <Row style="margin-top: 10px">
                <template v-if="collapse">
                    <Col v-bind="grid" v-for="(item, index) in advancedSearchForm" :key="index">
                        <FormItem :label="item.label_name" :prop="item.label_prop" :label-for="item.label_prop">
                            <template v-if="item.ele_type === 'select'">
                                <Select v-model="item.ele_value" placeholder="请选择" :element-id="item.label_prop">
                                    <Option v-for="(val, key) in item.options" :key="key" :value="val.value">{{ val.name }}</Option>
                                </Select>
                            </template>
                            <template v-else-if="item.ele_type === 'input'">
                                <Input v-model="item.ele_value" placeholder="请输入关键词搜索" :element-id="item.label_prop"/>
                            </template>
                            <template v-else-if="item.ele_type === 'date'">
                                <DatePicker :value="item.ele_value" type="date" format="yyyy-MM-dd HH:mm:ss" :options="item.options" placeholder="请选择日期"></DatePicker>
                            </template>
                            <template v-else-if="item.ele_type === 'datetime'">
                                <DatePicker :value="item.ele_value" type="datetime" format="yyyy-MM-dd HH:mm:ss" :options="item.options" placeholder="请选择日期"></DatePicker>
                            </template>
                            <template v-else-if="item.ele_type === 'daterange'">
                                <DatePicker :value="item.ele_value" type="daterange" format="yyyy-MM-dd HH:mm:ss" :options="item.options" placeholder="请选择日期范围"></DatePicker>
                            </template>
                        </FormItem>
                    </Col>
                    <Col v-bind="grid" class="ivu-text-right">
                        <FormItem label="">
                            <Button type="primary" @click="handleSubmit">查询</Button>
                            <Button class="ivu-ml-8" @click="handleReset">重置</Button>
                        </FormItem>
                    </Col>
                </template>
            </Row>
        </Form>
    </div>
</template>
<script>
    // baseSearchForm: {
    //      keyword: '',
    //      type: '',
    //      options: [
    //          {
    //              value: '',
    //              name: ''
    //          }
    //      ]
    // }
    // advancedSearchForm: [
    //      {
    //          label_name: '状态：',
    //          label_prop: 'label_name',
    //          ele_value: '',
    //          ele_type: 'select',
    //          options: [
    //              {
    //                  value: '',
    //                  name: ''
    //              }
    //          }
    //      },
    // }
    import { mapState } from 'vuex';
    export default {
        props: {
            showExport: {
                type: Boolean,
                default: true
            },
            showCreate: {
                type: Boolean,
                default: true
            },
            showAdvanced: {
                type: Boolean,
                default: true
            },
            showMultiDel: {
                type: Boolean,
                default: false
            },
            baseSearchForm: {
                type: Array,
                default: () => {
                    return []
                }
            },
            advancedSearchForm: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data () {
            return {
                gridLeft: {
                    xl: 16,
                    lg: 16,
                    md: 12,
                    sm: 24,
                    xs: 24
                },
                grid: {
                    xl: 8,
                    lg: 8,
                    md: 12,
                    sm: 24,
                    xs: 24
                },
                collapse: false,
                searchForm: {}
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile'
            ]),
            labelWidth () {
                return this.isMobile ? undefined : 100;
            },
            labelPosition () {
                return this.isMobile ? 'top' : 'right';
            }
        },
        methods: {
            handleSubmit () {
                this.$emit('on-search', this.searchForm);
            },
            handleReset () {
                this.$refs.searchForm.resetFields();
                this.$emit('on-reset');
            },
            handleOpenCreate () {
                this.$emit('on-create-form', true, -1);
            },
            handleExport () {
                this.$emit('on-export');
            }
        }
    }
</script>
<style scoped>
    .ivu-text-right {
        float: right;
    }
</style>

