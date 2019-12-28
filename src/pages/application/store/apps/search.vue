<template>
    <div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Form>
                <FormItem label="分类：">
                    <Button type="text">类别一</Button>
                    <Button type="text">类别一</Button>
                    <Button type="text">类别一</Button>
                    <Button type="text">类别一</Button>
                    <Button type="text">类别一</Button>
                    <Button type="text">类别一</Button>
                </FormItem>
                <Divider dashed />
                <FormItem label="排序：">
                    <RadioGroup v-model="order">
                        <Radio label="new">最新创建</Radio>
                        <Radio label="update">最后更新</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
    export default {
        name: 'search',
        data () {
            return {
                type: [],
                order: 'new'
            }
        }
    }
</script>
<style scoped>
</style>
