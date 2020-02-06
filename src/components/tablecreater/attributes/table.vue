<template>
    <div>
        <div v-if="currentElement">
            <Form
                    ref="currentFormInline"
                    :model="currentElement"
                    label-position="top"
            >
                <Card dis-hover>
                    <span slot="title">基本属性</span>
                    <FormItem label="字段hash">
                        <Input disabled v-model="currentElement.ele_hash" placeholder="请输入字段标识" />
                    </FormItem>

                </Card>
            </Form>
        </div>
    </div>
</template>

<script>
    import dataJson from "@api/index";

    export default {
        name: "attribute-table",
        props: {
            currentElement: {
                type: Object,
                default () {
                    return {}
                }
            },
            formConfig: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data () {
            return {
                apiList: dataJson.searchList
            }
        },
    }
</script>

<style scoped>

</style>