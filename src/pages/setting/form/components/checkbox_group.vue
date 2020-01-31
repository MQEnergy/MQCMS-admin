<template>
    <div>
        <CheckboxGroup
                v-model="element.ele_value"
                :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                :class="element.custom_class"
        >
            <Checkbox
                    v-for="(option, index) in element.options"
                    :key="index"
                    :label="option.label"
                    :disabled="option.disabled"
                    :indeterminate="element.ele_attr.indeterminate"
                    :true-value="option.true_value"
                    :false-value="option.false_value"
                    :border="element.ele_attr.border"
            >
                <template v-if="option.icon">
                    <Icon :type="option.icon"></Icon>
                    <span>{{ option.label }}</span>
                </template>
                <template v-else>
                    {{ option.label }}
                </template>
            </Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
    export default {
        name: "component-checkbox-group",
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