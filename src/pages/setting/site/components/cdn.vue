<template>
    <div style="margin-top: 30px;">
        <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="100" v-width="600">
            <FormItem label="cdn地址：" prop="cdn_url" required>
                <Input v-model="createData.cdn_url" placeholder="请输入静态资源cdn地址" />
                <p v-color="'#999'">
                    此设置是前端静态资源的cdn地址，以 / 结尾 如：http://cdn.mqcms.net/
                </p>
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
        name: "site-cdn",
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