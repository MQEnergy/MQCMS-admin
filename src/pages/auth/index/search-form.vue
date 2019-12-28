<template>
    <div>
        <Form ref="searchForm" :model="searchForm" :label-width="labelWidth" :label-position="labelPosition">
            <Row>
                <Col v-bind="gridLeft">
                    <FormItem :label-width="0">
                        <Input v-model="searchForm.keyword" placeholder="请输入查询内容" style="float: left; max-width: 450px">
                            <Select v-model="searchForm.type" slot="prepend" style="width: 100px">
                                <Option value="id">ID</Option>
                                <Option value="account">标签名称</Option>
                                <Option value="real_name"></Option>
                            </Select>
                            <Button type="primary" slot="append" @click="handleSubmit">查询</Button>
                        </Input>
                        <Button style="float: left" type="text" v-color="'#2d8cf0'" @click="collapse = !collapse">
                            {{ collapse ? '普通搜索' : '高级搜索' }}<Icon :type="collapse ? 'ios-arrow-up' : 'ios-arrow-down'" />
                        </Button>
                    </FormItem>
                </Col>
                <Col v-bind="grid" class="ivu-text-right">
                    <FormItem :label-width="0">
                        <Button class="ivu-ml-8" type="primary" icon="md-add" @click="handleOpenCreate">新建</Button>
                        <Button class="ivu-ml-8" type="primary" icon="md-download" @click="handleExport">导出</Button>
                        <Dropdown class="ivu-ml-8">
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
                    <Col v-bind="grid">
                        <FormItem label="标签状态：" prop="status" label-for="status">
                            <Select v-model="searchForm.status" placeholder="请选择" element-id="status">
                                <Option :value="0">禁用</Option>
                                <Option :value="1">正常</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col v-bind="grid">
                        <FormItem label="是否热门：" prop="is_hot" label-for="is_hot">
                            <Select v-model="searchForm.is_hot" placeholder="请选择" element-id="is_hot">
                                <Option :value="0">正常</Option>
                                <Option :value="1">热门</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col v-bind="grid">
                        <FormItem label="标签类型：" prop="tag_type" label-for="tag_type">
                            <Select v-model="searchForm.tag_type" placeholder="请选择" element-id="tag_type">
                                <Option :value="1">系统创建</Option>
                                <Option :value="2">用户创建</Option>
                            </Select>
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
    import { mapState } from 'vuex';
    export default {
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
                searchForm: {
                    type: 'id',
                    keyword: '',
                    id: '',
                    status: '',
                    tag_name: '',
                    tag_title: '',
                    tag_desc: '',
                    tag_keyword: ''
                }
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
