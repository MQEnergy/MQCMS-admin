<template>
    <div>
        <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="100" v-width="500">
            <FormItem label="地址：" prop="href">
                <RadioGroup v-model="createData.href_choose" type="button" @on-change="handleRadioChange">
                    <Radio label="1">页面</Radio>
                    <Radio label="2">链接</Radio>
                </RadioGroup>
                <div class="ivu-mt-16">
                    <Select v-if="createData.href_choose == 1" v-model="createData.href">
                        <Option value="home">首页</Option>
                        <OptionGroup label="文章分类">
                            <Option v-for="item in pageList['cateList']" :value="item.id" :key="index">{{ item.cate_name }}</Option>
                        </OptionGroup>
                    </Select>
                    <Input v-else v-model="createData.href" placeholder="请输入地址 如：http://www.mqcms.net" />
                </div>
            </FormItem>
            <FormItem label="名称：" prop="name">
                <Input v-model="createData.name" placeholder="请输入名称" />
            </FormItem>
            <FormItem label="上级分类：" prop="target">
                <Select v-model="createData.target">
                    <Option value="">默认方式</Option>
                    <Option value="_blank">新页面打开</Option>
                </Select>
            </FormItem>
            <FormItem label="打开方式：" prop="target">
                <Select v-model="createData.target">
                    <Option value="">默认方式</Option>
                    <Option value="_blank">新页面打开</Option>
                </Select>
            </FormItem>
            <FormItem label="自定义图标：" prop="icon">
                <Tooltip placement="top">
                    <div slot="content">
                        <template v-if="createData.icon">
                            <Icon v-if="!currentIcon.is_custom" :type="createData.icon" size="30" />
                            <Icon v-else class="i-icon" :custom="'i-icon-' + createData.icon" size="30" />
                        </template>
                        <template v-else>
                            暂无预览
                        </template>
                    </div>
                    <Button type="dashed" @click="handleSelectIcon">
                        {{ createData.icon ? createData.icon : '选择icon' }}
                    </Button>
                </Tooltip>
            </FormItem>
            <FormItem label="状态：" prop="status">
                <Switch v-model="createData.statusFormat" @on-change="handleSwitchChange" />
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" @click="handleSubmit">保存</Button>
            </FormItem>
        </Form>

    </div>
</template>

<script>
    import {NavigationItemList, NavigationItemShow, NavigationItemStore, NavigationItemUpdate} from "@api/navbaritem";
    export default {
        name: 'create-item-form',
        data () {
            return {
                loading: false,
                showCreate: false,
                updateIndex: -1,
                creating: true,
                currentKeyword: '',
                createData: {
                    name: '',
                    nav_desc: '',
                    href: '',
                    href_choose: "1",
                    target: '',
                    icon: '',
                    status: 1,
                    is_main: 0,
                    statusFormat: true,
                    isMainFormat: false,
                },
                currentIcon: {},
                createRules: {
                    href: [
                        { required: true, message: '请输入选择地址', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ]
                },
                info: {},
                pageList: [],
            }
        },
        mounted() {
            this.handleCateList();
        },
        methods: {
            handleCateList () {
                NavigationItemList({}).then(res => {
                    this.pageList = res;
                })
            },
            handleIconShow (currentIcon) {
                this.currentIcon = currentIcon;
                this.createData.icon = currentIcon.font_class;
            },
            // 新增数据
            handleSubmit () {
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        // 新建
                        NavigationItemStore(this.createData).then(async res => {
                            this.$Message.success('创建成功');
                            this.$emit('on-ok');
                            this.handleCancel();
                        });
                        this.creating = true;
                        this.$nextTick(() => {
                            this.creating = false;
                        });
                    } else {
                        this.creating = true;
                        this.$nextTick(() => {
                            this.creating = false;
                        });
                    }
                });
            },
            handleCancel () {
                this.$refs.create.resetFields();
            },
            handleSwitchChange (status) {
                this.createData.status = status ? 1 : 0;
                this.createData.statusFormat = status;
            },
            handleMainChange (status) {
                this.createData.is_main = status ? 1 : 0;
                this.createData.isMainFormat = status;
            },
            handleSelectIcon () {
                this.$emit('on-show');
            },
            handleRadioChange (value) {
                this.createData.href = '';
            }
        }
    }
</script>
<style scoped>
</style>
