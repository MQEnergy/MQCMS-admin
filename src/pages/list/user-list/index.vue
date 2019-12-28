<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="用户列表" content="包含用户信息的列表，带有常规操作。" hidden-breadcrumb />
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <div style="position: relative;height: 100px;" v-if="loading">
                <Spin fix size="large"></Spin>
            </div>
            <List item-layout="vertical">
                <ListItem v-for="(item, index) in data" :key="index">
                    <ListItemMeta>
                        <i-link :to="item.userLink" target="_blank" slot="avatar">
                            <Avatar :src="item.avatar" />
                        </i-link>
                        <i-link :to="item.userLink" target="_blank" slot="title">
                            {{ item.name }}
                        </i-link>
                    </ListItemMeta>
                    <div>
                        <p>
                            ID：{{ item.id }}
                            <Button size="small" icon="md-copy" @click="handleCopyId(index)">复制</Button>
                        </p>
                        <p>
                            邮箱地址：{{ item.mail }}
                        </p>
                    </div>
                    <div class="ivu-mt-8">
                        <Tag color="green" v-if="item.is_check">已验证邮箱</Tag>
                        <Tag color="red" v-else>未验证邮箱</Tag>
                        <Tag color="blue" v-if="item.status === 1">普通用户</Tag>
                        <Tag color="purple" v-if="item.status === 2">管理员</Tag>
                        <Tag color="volcano" v-if="item.status === 3">运营人员</Tag>
                        <Button size="small" icon="md-list" class="ivu-ml" @click="handleCollapse(index)">展开操作</Button>
                    </div>
                    <template slot="action" v-if="item.is_collapse">
                        <li>
                            <Poptip confirm transfer :disabled="item.status === 1" title="确认将该用户设置为普通用户吗？" @on-ok="handleSetStatus(index, 1)">
                                <Button type="primary" :disabled="item.status === 1" size="small">普通用户</Button>
                            </Poptip>
                        </li>
                        <li>
                            <Poptip confirm transfer :disabled="item.status === 2" title="确认将该用户设置为管理员吗？" @on-ok="handleSetStatus(index, 2)">
                                <Button type="primary" :disabled="item.status === 2" size="small">管理员</Button>
                            </Poptip>
                        </li>
                        <li>
                            <Poptip confirm transfer :disabled="item.status === 3" title="确认将该用户设置为运营人员吗？" @on-ok="handleSetStatus(index, 3)">
                                <Button type="primary" :disabled="item.status === 3" size="small">运营人员</Button>
                            </Poptip>
                        </li>
                    </template>
                </ListItem>
                <div class="ivu-mt ivu-text-center" slot="footer">
                    <Page :total="100" show-elevator show-sizer show-total :simple="isMobile" />
                </div>
            </List>
        </Card>
    </div>
</template>
<script>
    import { mapState } from 'vuex';
    import listData from './data';

    export default {
        name: 'list-user-list',
        data () {
            return {
                data: [],
                loading: false
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'isMobile'
            ])
        },
        methods: {
            getData () {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.data = listData;
                }, 1000);
            },
            handleCopyId (index) {
                const id = this.data[index].id;
                this.$Copy({
                    text: id
                });
            },
            handleCollapse (index) {
                this.data[index].is_collapse = !this.data[index].is_collapse;
            },
            handleSetStatus (index, status) {
                this.data[index].status = status;
                this.$Message.success('设置成功！');
            }
        },
        mounted () {
            this.getData();
        }
    }
</script>
