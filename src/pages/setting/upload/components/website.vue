<template>
    <div style="margin-top: 30px;">
        <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="100" v-width="600">
            <FormItem label="网站名称：" prop="website_name" required>
                <Input v-model="createData.user_name" placeholder="请输入网站名称" />
            </FormItem>
            <FormItem label="后台风格：" prop="template_id">
                <Select v-model="createData.select">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem label="ICP备案：" prop="site_icp">
                <Input v-model="createData.user_name" placeholder="请输入ICP备案" />
            </FormItem>
            <FormItem label="公网安备：" prop="site_gwa">
                <Input v-model="createData.user_name" placeholder="请输入公网安备" />
            </FormItem>
            <FormItem label="站长邮箱：" prop="site_email">
                <Input v-model="createData.site_email" placeholder="请输入站长邮箱" />
            </FormItem>
            <FormItem label="统计代码：" prop="site_email">
                <Input type="textarea" v-model="createData.site_email" placeholder="请输入统计代码" />
            </FormItem>
            <FormItem>
                <Button type="primary">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "site-website",
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