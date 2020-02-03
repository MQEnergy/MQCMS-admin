<template>
    <div>
        table属性
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
                apiList: dataJson.apiList
            }
        },
    }
</script>

<style scoped>

</style>