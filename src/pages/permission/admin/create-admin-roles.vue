<template>
    <div>
        <Modal width="600" :mask-closable="false" v-model="showCreate" :title="modalTitle" :loading="creating" @on-ok="handleCreate" @on-cancel="handleCancel">
            <Transfer
                    :data="roleList"
                    :target-keys="targetRoleList"
                    :list-style="listStyle"
                    :titles="titles"
                    filterable
                    :filter-method="filterMethod"
                    @on-change="handleChange">
            </Transfer>
        </Modal>
    </div>
</template>

<script>
import { AdminRoleList, AdminDistributeRole } from '@/api/permission/admin';
import { RoleIndex } from '@/api/permission/role';

export default {
    name: 'create-admin-roles',
    data () {
        return {
            showCreate: false,
            creating: false,
            listStyle: {
                width: '250px',
                height: '300px'
            },
            modalTitle: '角色分配',
            titles: ['可选角色', '分配角色'],
            updateIndex: -1,
            roleList: [],
            targetRoleList: []
        }
    },
    methods: {
        handleShowUpdateCreate (status, updateIndex) {
            this.showCreate = status;
            this.updateIndex = updateIndex;
            if (this.updateIndex > 0) {
                this.handleAdminRoleList();
                this.handleAllRoleList();
            }
        },
        handleAllRoleList () {
            RoleIndex({
                page: 1,
                limit: 100
            }).then(res => {
                res.data.forEach((item, index) => {
                    item.key = item.id;
                    item.label = item.name;
                    item.description = item.name;
                    item.disabled = false;
                });
                this.roleList = res.data;
            }).finally(() => {
            })
        },
        handleAdminRoleList () {
            AdminRoleList({
                id: this.updateIndex
            }).then(res => {
                let keys = [];
                res.forEach((item, index) => {
                    keys.push(item.id);
                });
                this.targetRoleList = keys;
            }).finally(() => {
                this.creating = false;
                this.$nextTick(() => {
                    this.creating = true;
                });
            })
        },
        // 新增数据
        handleCreate () {
            this.creating = true;
            if (this.targetRoleList.length === 0) {
                this.$Message.warning('请选择角色');
                return false;
            }
            AdminDistributeRole({
                uid: this.updateIndex,
                role_ids: this.targetRoleList
            }).then(res => {
                this.$Message.success('修改成功');
                this.$emit('on-ok');
                this.handleCancel();
            }).finally(() => {
                this.creating = false;
            });
        },
        handleCancel () {
            this.$emit('on-create-form', false, -1);
        },
        getMockData () {
            let mockData = [];
            for (let i = 1; i <= 20; i++) {
                mockData.push({
                    key: i.toString(),
                    label: 'Content ' + i,
                    description: 'The desc of content  ' + i,
                    disabled: Math.random() * 3 < 1
                });
            }
            return mockData;
        },
        getTargetKeys () {
            return this.getMockData()
                .filter(() => Math.random() * 2 > 1)
                .map(item => item.key);
        },
        handleChange (newTargetKeys) {
            this.targetRoleList = newTargetKeys;
        },
        filterMethod (data, query) {
            return data.label.indexOf(query) > -1;
        }
    }
}
</script>
<style>
    .create-form .ivu-input-hide-icon .ivu-input-icon {
        right: 90px !important;
    }
    .upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .upload-list .ivu-avatar {
        width: 100%;
        height: 100%;
    }
    .upload-list .ivu-avatar > img {
        height: 100%;
        width: 100%;
    }
</style>
