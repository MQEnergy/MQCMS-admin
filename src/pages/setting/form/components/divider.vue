<template>
    <div>
        <Divider
                :class="element.custom_class"
                :orientation="element.ele_attr.orientation"
                :type="element.ele_attr.type"
                :dashed="element.ele_attr.dashed"
                v-color="element.ele_attr.color"
        >
            {{ element.ele_value }}
        </Divider>
    </div>
</template>

<script>
    export default {
        name: "component-divider",
        props: {
            element: {
                type: Object,
                default: {}
            },
            index: {
                type: Number,
                default: 0
            },
            formConfig: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style scoped>

</style>