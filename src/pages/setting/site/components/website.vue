<template>
    <div style="margin-top: 30px;">
        <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="100" v-width="600">
            <FormItem label="网站名称：" prop="site_name">
                <Input v-model="createData.site_name" placeholder="请输入网站名称" />
            </FormItem>
            <FormItem label="后台风格：" prop="theme_id">
                <Select v-model="createData.theme_id">
                    <Option v-for="(item, index) in themeList" :value="item.id" :label="item.theme_name" :key="index">
                        <span>{{ item.theme_name }}</span>
                        <span v-if="item.is_used == 1" style="float:right;color:#19be6b;">当前默认</span>
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="ICP备案：" prop="icp_no">
                <Input v-model="createData.icp_no" placeholder="请输入ICP备案" />
            </FormItem>
            <FormItem label="公网安备：" prop="safe_record">
                <Input v-model="createData.safe_record" placeholder="请输入公网安备" />
            </FormItem>
            <FormItem label="站长邮箱：" prop="site_email">
                <Input v-model="createData.site_email" placeholder="请输入站长邮箱" />
            </FormItem>
            <FormItem label="统计代码：" prop="site_analytics">
                <Input type="textarea" v-model="createData.site_analytics" placeholder="请输入统计代码" />
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" @click="handleSubmit">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {SiteConfigShow, SiteConfigStore, SiteConfigUpdate} from "@api/siteconfig";
    import {ThemeConfigIndex} from "@api/themeconfig";

    export default {
        name: "site-website",
        props: {
            createData: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                loading: false,
                createRules: {
                    site_name: [
                        { required: true, message: '请输入网站名称', trigger: 'blur' }
                    ],
                },
                themeList: []
            }
        },
        mounted() {
            this.handleThemeList();
        },
        methods: {
            handleThemeList () {
                ThemeConfigIndex().then(res => {
                    this.themeList = res.data;
                });
            },
            handleSubmit () {
                this.$refs.create.validate((valid) => {
                    if (valid) {
                        if (!this.createData.id) {
                            // 新建
                            SiteConfigStore(this.createData).then(async res => {
                                this.$Message.success('创建成功');
                                this.$emit('on-show');
                            });
                        } else {
                            // 修改
                            SiteConfigUpdate(this.createData).then(res => {
                                this.$Message.success('修改成功');
                            });
                        }
                        this.loading = true;
                        this.$nextTick(() => {
                            this.loading = false;
                        });
                    } else {
                        this.loading = true;
                        this.$nextTick(() => {
                            this.loading = false;
                        });
                    }
                });
            },
        }

    }
</script>

<style scoped>

</style>