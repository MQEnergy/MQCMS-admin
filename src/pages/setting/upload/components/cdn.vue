<template>
    <div style="margin-top: 30px;">
        <Form ref="create" :model="createData" :rules="createRules" label-position="right" :label-width="100" v-width="600">
            <FormItem label="cdn地址：" prop="website_name" required>
                <Input v-model="createData.user_name" placeholder="请输入静态资源cdn地址" />
                <p>
                    此设置是前端静态资源的cdn地址
                </p>
            </FormItem>
            <FormItem>
                <Button type="primary">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "site-cdn",
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