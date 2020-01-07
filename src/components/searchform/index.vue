<template>
    <div class="search-form">
        <Form ref="searchForm" :label-width="labelWidth" :label-position="labelPosition">
            <Row class="search-form-base-row">
                <Col v-bind="gridLeft">
                    <FormItem :label-width="0">
                        <Input v-model="baseSearchForm.keyword" clearable placeholder="请输入查询内容"
                               style="float: left; max-width: 450px">
                            <Select v-model="baseSearchForm.type" slot="prepend" style="width: 100px">
                                <Option v-for="(item, index) in baseSearchForm.options" :key="index"
                                        :value="item.value">{{ item.name }}
                                </Option>
                            </Select>
                            <Button type="primary" slot="append" @click="handleSubmit" icon="ios-search">查询</Button>
                        </Input>
                        <Button v-if="showAdvanced" style="float: left" type="text" v-color="'#2d8cf0'"
                                @click="collapse = !collapse">
                            {{ collapse ? '普通搜索' : '高级搜索' }}
                            <Icon :type="collapse ? 'ios-arrow-up' : 'ios-arrow-down'" />
                        </Button>
                    </FormItem>
                </Col>
                <Col v-bind="gridRight" class="ivu-text-right">
                    <FormItem :label-width="0">
                        <Button v-if="showRefresh" class="ivu-ml-8" type="success" icon="md-refresh"
                                @click="handleRefresh">刷新
                        </Button>
                        <Button v-if="showCreate" class="ivu-ml-8" type="primary" icon="md-add"
                                @click="handleOpenCreate">新建
                        </Button>
                        <Button v-if="showExport" class="ivu-ml-8" type="primary" icon="md-download"
                                @click="handleExport">导出
                        </Button>
                        <Dropdown v-if="showMultiDel" class="ivu-ml-8" @on-click="handleMultiClick">
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
                                <Select v-model="item.ele_value" placeholder="请选择" clearable :element-id="item.label_prop">
                                    <Option v-for="(val, key) in item.options" :key="key" :value="val.value">{{ val.name
                                        }}
                                    </Option>
                                </Select>
                            </template>
                            <template v-else-if="item.ele_type === 'input'">
                                <Input v-model="item.ele_value" placeholder="请输入关键词搜索" clearable :element-id="item.label_prop" />
                            </template>
                            <template v-else-if="item.ele_type === 'switch'">
                                <Switch @on-change="handleSwitchChange" v-model="item.ele_value"
                                        :true-value="item.options.true_value"
                                        :false-value="item.options.false_value">
                                    <template v-show="item.options && Object.keys(item.options) > 0">
                                        <span slot="open">{{ item.options.open }}</span>
                                        <span slot="close">{{ item.options.close }}</span>
                                    </template>
                                </Switch>
                            </template>
                            <template v-else-if="item.ele_type === 'date' || item.ele_type === 'datetime' || item.ele_type === 'daterange' || item.ele_type === 'datetimerange'">
                                <DatePicker
                                    style="width: 100%"
                                    :ref="'date_picker_' + item.label_prop"
                                    @on-change="handleDateChange(item.label_prop, index)"
                                    :value="item.ele_value"
                                    :type="item.ele_type"
                                    :format="dateFormat(item.format, item.ele_type)"
                                    :options="item.options"
                                    placeholder="请选择日期">
                                </DatePicker>
                            </template>
                        </FormItem>
                    </Col>
                    <Col v-bind="grid">
                        <slot name="content"></slot>
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
    //      type: '',
    //      keyword: '',
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
    //          ]
    //      },
    // }
    import {mapState} from 'vuex';
    import mixin from './mixins';
    
    export default {
        name: '',
        mixins: [ mixin ],
        props: {
            showRefresh: {
                type: Boolean,
                default: true
            },
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
                type: Object,
                default: () => {
                    return {}
                }
            },
            advancedSearchForm: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                gridLeft: {
                    xl: 14,
                    lg: 14,
                    md: 12,
                    sm: 24,
                    xs: 24
                },
                gridRight: {
                    xl: 10,
                    lg: 10,
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
                searchForm: {
                    time: {}
                },
                timeArr: [],
                selectedKeys: []
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile'
            ]),
            labelWidth() {
                return this.isMobile ? undefined : 100;
            },
            labelPosition() {
                return this.isMobile ? 'top' : 'right';
            }
        },
        methods: {
            handleSubmit() {
                this.searchForm = {
                    type: this.baseSearchForm.type,
                    keyword: this.baseSearchForm.keyword
                };
                if (this.advancedSearchForm.length > 0) {
                    const timeArr = {};
                    this.advancedSearchForm.forEach((item, index) => {
                        switch (item.ele_type) {
                            case 'date':
                            case 'datetime':
                            case 'daterange':
                            case 'datetimerange':
                                timeArr[item.label_prop] = item.ele_value;
                                this.searchForm.time = timeArr;
                                break;
                            default:
                                this.searchForm[item.label_prop] = item.ele_value;
                                break;

                        }
                    })
                }
                console.log(this.searchForm)
                this.$emit('on-search', this.searchForm);
            },
            handleReset() {
                this.baseSearchForm.keyword = '';
                if (this.advancedSearchForm.length > 0) {
                    this.advancedSearchForm.forEach((item, index) => {
                        if (item.ele_type !== 'switch') {
                            item.ele_value = '';
                        }
                    })
                }
                this.searchForm = {
                    time: {}
                };
                this.$emit('on-reset');
            },
            handleRefresh() {
                this.$emit('on-search', this.searchForm);
            },
            handleOpenCreate() {
                this.$emit('on-create-form', true, -1);
            },
            handleExport() {
                this.$emit('on-export');
            },
            handleMultiClick (value) {
                if (value === 'delete') {
                    this.$emit('on-multi-del');
                }
            },
            handleSwitchChange(value) {
            },
            handleDateChange(item, index) {
                const time = this.$refs[`date_picker_${item}`][0].publicStringValue;
                this.advancedSearchForm[index].ele_value = time;
            }
        }
    }
</script>
<style scoped>
    .ivu-text-right {
        float: right;
    }
</style>
<style lang="less">
    .search-form {
        &-base-row {
            .ivu-input-icon {
                right: 85px !important;
            }
        }
    }
</style>

