<template>
    <div style="margin-top: 30px;">
        <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="100" v-width="600">
            <FormItem label="SEO标题：" prop="seo_title">
                <Input v-model="createData.seo_title" placeholder="请输入SEO标题" />
            </FormItem>
            <FormItem label="SEO关键字：" prop="seo_keyword">
                <Input v-model="createData.seo_keyword" placeholder="请输入SEO关键字" />
            </FormItem>
            <FormItem label="SEO描述：" prop="seo_description">
                <Input type="textarea" v-model="createData.seo_description" placeholder="请输入SEO描述" />
            </FormItem>
            <FormItem>
                <Button type="primary" :loading="loading" @click="handleSubmit">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {SiteConfigStore, SiteConfigUpdate} from "@api/siteconfig";

    export default {
        name: "site-seo",
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
                }
            }
        },
        methods: {
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