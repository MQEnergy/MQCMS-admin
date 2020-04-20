<template>
    <div style="margin-top: 30px;">
        <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="100" v-width="600">
            <FormItem label="SEO标题：" prop="website_name" required>
                <Input v-model="createData.user_name" placeholder="请输入SEO标题" />
            </FormItem>
            <FormItem label="SEO关键字：" prop="site_email">
                <Input v-model="createData.site_email" placeholder="请输入SEO关键字" />
            </FormItem>
            <FormItem label="SEO描述：" prop="site_email">
                <Input type="textarea" v-model="createData.site_email" placeholder="请输入SEO描述" />
            </FormItem>
            <FormItem>
                <Button type="primary">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "site-seo",
        data () {
            return {
                createData: {

                }
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>