<template>
    <div>
        <attribute-search v-if="currentElement.ele_name === 'search'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-table v-if="currentElement.ele_name === 'table'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
    </div>
</template>

<script>
    import AttributeSearch from "./attributes/search";
    import AttributeTable from "./attributes/table";

    export default {
        name: "table-attribute",
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
        components: {
            AttributeTable,
            AttributeSearch
        },
        data () {
            return {
            }
        },
        methods: {
            handleElementSize (type) {
                this.$emit('on-element-size', type);
            }
        }
    }
</script>

<style scoped>

</style>