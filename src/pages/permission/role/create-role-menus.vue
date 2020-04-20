<template>
    <div>
        <Drawer title="权限分配" v-model="showCreate" width="800" :mask-closable="false" :styles="styles">
            <div>
                <Collapse v-model="currentPanel">
                    <Panel v-for="(item, index) in createData.menu_list" :name="'menu' + '-' + index">
                        {{ item.title }}
                        <div slot="content">
                            <List>
                                <ListItem v-for="(val, key) in item.children" :key="index + '-' + key">
                                    <Row :gutter="10" v-width="'100%'">
                                        <Col span="10">
                                            <template v-if="val.menu_type == 1">
                                                {{ val.title }}
                                            </template>
                                            <template v-if="val.menu_type == 2">
                                                <CheckboxGroup v-model="item.check_list" @on-change="handleCheckCell(val, 1)">
                                                    <template v-for="(v, k) in item.children">
                                                        <Checkbox :label="v.id">{{ v.title }}</Checkbox>
                                                    </template>
                                                </CheckboxGroup>
                                            </template>
                                        </Col>
                                        <Col span="11">
                                            <CheckboxGroup v-model="val.check_list" @on-change="handleCheckCell(val, 2)">
                                                <template v-for="(v, k) in val.children">
                                                    <Checkbox :label="v.id">{{ v.title }}</Checkbox>
                                                </template>
                                            </CheckboxGroup>
                                        </Col>
                                        <Col span="3" class="ivu-fr">
                                            <span class="ivu-pl-16">
                                                <Checkbox
                                                        v-if="val.menu_type == 1"
                                                        :indeterminate="val.check_list.length != 0 && val.check_list.length < val.children.length"
                                                        :value="val.check_list.length != 0 && val.check_list.length === val.children.length"
                                                        @click.prevent.native="handleCheckCellAll(val, 2)"
                                                >全选</Checkbox
                                                >
                                                <Checkbox
                                                        v-if="val.menu_type == 2"
                                                        :indeterminate="item.check_list.length != 0 && item.check_list.length < item.children.length"
                                                        :value="item.check_list.length != 0 && item.check_list.length === item.children.length"
                                                        @click.prevent.native="handleCheckCellAll(item, 1)"
                                                >全选</Checkbox
                                                >
                                            </span>
                                        </Col>
                                    </Row>
                                </ListItem>
                            </List>
                        </div>
                    </Panel>
                </Collapse>
            </div>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="handleCancel">取消</Button>
                <Button type="primary" :loading="creating" @click="handleSubmit">提交</Button>
            </div>
        </Drawer>
    </div>
</template>
<script>
    import { RoleView, RoleUpdatePermission } from '@/api/permission/role'
    export default {
        name: 'create-role-menus',
        data() {
            return {
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                showCreate: false,
                updateIndex: -1,
                creating: false,
                currentKeyword: '',
                createData: {},
                info: {},
                currentPanel: 'menu-0',
                chooseList: []
            }
        },
        methods: {
            handleShowUpdateCreate(status, updateIndex) {
                this.showCreate = status;
                this.updateIndex = updateIndex;
                if (this.updateIndex > 0) {
                    this.handleShow()
                }
            },
            handleShow() {
                RoleView({
                    id: this.updateIndex
                })
                    .then(res => {
                        this.createData = res
                    })
                    .finally(() => {
                        this.creating = false
                    })
            },
            handleCancel() {
                this.$emit('on-create-form', false, -1)
            },
            handleSubmit() {
                if (this.updateIndex > 0) {
                    // 修改
                    this.creating = true;
                    RoleUpdatePermission({
                        menu_ids: this.createData.menu_ids,
                        id: this.createData.id
                    })
                        .then(async res => {
                            this.$emit('on-ok');
                            this.$Message.success('保存成功')
                        })
                        .finally(() => {
                            this.showCreate = false;
                            this.creating = false
                        })
                }
            },
            handleCheckCell(val, type=1) {
                this.createData.menu_ids = this.handleCheckList(this.createData.menu_list, type)
            },
            handleCheckCellAll(val, type=1) {
                if (val.check_list.length > 0) {
                    val.check_list = []
                } else {
                    if (val.children && val.children.length > 0) {
                        val.children.forEach((item, index) => {
                            val.check_list.push(item.id)
                        })
                    }
                }
                this.createData.menu_ids = this.handleCheckList(this.createData.menu_list, type)
            },
            handleCheckList(list, type=1, checkList = [], level = 0) {
                if (type === 2) {
                    if (level == 0) {
                        list.forEach(item => {
                            delete item.check_list
                        })
                    }
                }
                list.forEach(item => {
                    if (level > 0) {
                        checkList.push(item.check_list)
                    }
                    if (item.children) {
                        level++;
                        return this.handleCheckList(item.children, type, checkList, level)
                    }
                });
                let data = [];
                checkList.forEach((item, index) => {
                    if (item && item.length > 0) {
                        item.forEach(val => {
                            data.push(val)
                        })
                    }
                });
                return data
            }
        }
    }
</script>
<style>
    .demo-drawer-footer {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>
