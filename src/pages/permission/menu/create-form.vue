<template>
    <div>
        <Modal width="650" :styles="{ top: '40px' }" :mask-closable="false" v-model="showCreate" :title="modalTitle" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="120">
                <FormItem label="菜单名称：" prop="title">
                    <Input v-model="createData.title" placeholder="请输入菜单名称" />
                </FormItem>
                <FormItem label="菜单别名：" prop="alias_title">
                    <Input v-model="createData.alias_title" placeholder="请输入菜单别名" />
                </FormItem>
                <FormItem label="父节点：" prop="parent_id">
                    <Select v-model="createData.parent_id" clearable>
                        <Option :value="0">作为一级分类</Option>
                        <Option v-for="(item, index) in menuOptions" :value="item.id" :label="item.title">
                            <span>{{ item.title }}</span>
                            <span style="float:right;color:#ccc">{{ item.alias_title }}</span>
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="菜单描述：" prop="desc">
                    <Input v-model="createData.desc" placeholder="请输入菜单描述" />
                </FormItem>
                <FormItem label="前端路由：" prop="frontend_url">
                    <Input v-model="createData.frontend_url" placeholder="请输入菜单别名" />
                </FormItem>
                <FormItem label="后端路由：" prop="backend_url">
                    <Input v-model="createData.backend_url" placeholder="请输入菜单别名" />
                </FormItem>
                <FormItem label="自定义图标：" prop="custom">
                    <Tooltip placement="top">
                        <div slot="content">
                            <template v-if="createData.custom">
                                <Icon v-if="!currentIcon.is_custom" :type="createData.custom" size="30" />
                                <Icon v-else class="i-icon" :custom="'i-icon-' + createData.custom" size="30" />
                            </template>
                            <template v-else>
                                暂无预览
                            </template>
                        </div>
                        <Button type="dashed" @click="handleSelectIcon">
                            {{ createData.custom ? createData.custom : '选择icon' }}
                        </Button>
                    </Tooltip>
                </FormItem>
                <FormItem label="排序：" prop="sort_order">
                    <InputNumber :max="99999" :min="1" :step="1" v-width="150" v-model="createData.sort_order" placeholder="排序数字"></InputNumber>
                </FormItem>
                <FormItem label="顶部菜单：" prop="header">
                    <Input v-model="createData.header" placeholder="请输入顶部菜单，顶级菜单需要填写。如：home" />
                </FormItem>
                <FormItem label="开启状态：" prop="status">
                    <Switch v-model="createData.statusFormat" :value="createData.statusFormat" size="large" @on-change="handleSwitchChange" >
                        <span slot="open">启用</span>
                        <span slot="close">关闭</span>
                    </Switch>
                </FormItem>
            </Form>
        </Modal>
        <!-- icon选择 -->
        <Modal
                v-model="iconSeen"
                title="选择icon"
                width="800"
                :styles="{ top: '40px' }"
                :mask-closable="false"
                @on-ok="handleModalOk"
                @on-cancel="handleModalCancel">
            <icon-index @on-choose-icon="handleChooseIcon" />
        </Modal>
    </div>
</template>

<script>
    import IconIndex from "@/components/icon/index";
    import { MenuIndex, MenuShow, MenuStore, MenuUpdate } from '@/api/permission/menu'
    export default {
        name: 'create-form',
        components: {
            IconIndex
        },
        data () {
            return {
                showCreate: false,
                updateIndex: -1,
                creating: true,
                currentKeyword: '',
                createData: {
                    title: '',
                    alias_title: '',
                    parent_id: 0,
                    desc: '',
                    frontend_url: '',
                    backend_url: '',
                    custom: '',
                    sort_order: 50,
                    header: '',
                    status: 1,
                    menu_type: 1,
                    statusFormat: true
                },
                createRules: {
                    title: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' }
                    ],
                    alias_title: [
                        { required: true, message: '请输入菜单别名', trigger: 'blur' }
                    ]
                },
                info: {},
                modalTitle: '新建',
                menuOptions: [],
                iconSeen: false,
                currentIcon: {}
            }
        },
        mounted () {
        },
        methods: {
            getParentList () {
                this.loading = true;
                MenuIndex({
                    type: 3,
                    menu_type: 1
                }).then(res => {
                    this.menuOptions = res
                })
            },
            handleShowUpdateCreate (status, updateIndex) {
                this.showCreate = status;
                this.updateIndex = updateIndex;
                this.modalTitle = updateIndex < 0 ? '新建' : '编辑';
                if (this.updateIndex > 0) {
                    this.handleShow();
                }
                this.getParentList();
            },
            handleShow () {
                MenuShow({
                    id: this.updateIndex
                }).then(res => {
                    this.createData = Object.assign(this.createData, res);
                }).finally(() => {
                    this.creating = false;
                })
            },
            // 新增数据
            handleCreate () {
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        if (this.updateIndex < 0) {
                            // 新建
                            MenuStore(this.createData).then(async res => {
                                this.$Message.success('创建成功');
                                this.$emit('on-ok');
                                this.handleCancel();
                            });
                        } else {
                            this.createData.id = this.updateIndex;
                            // 修改
                            MenuUpdate(this.createData).then(res => {
                                this.$Message.success('修改成功');
                                this.$emit('on-ok');
                                this.handleCancel();
                            });
                        }
                        this.creating = false;
                        this.$nextTick(() => {
                            this.creating = true;
                        });
                    } else {
                        this.creating = false;
                        this.$nextTick(() => {
                            this.creating = true;
                        });
                    }
                });
            },
            handleCancel () {
                this.$refs.create.resetFields();
                this.$emit('on-create-form', false, -1);
            },
            handleSwitchChange (status) {
                this.createData.status = status ? 1 : 0;
                this.createData.statusFormat = status;
            },
            handleSelectIcon () {
                this.iconSeen = true;
            },
            handleModalOk () {
                this.createData.custom = this.currentIcon.font_class;
            },
            handleModalCancel () {
                this.iconSeen = false;
            },
            handleChooseIcon (item, index) {
                this.currentIcon = item;
            },
        }
    }
</script>
<style scoped>
</style>
