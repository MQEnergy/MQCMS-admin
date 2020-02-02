<template>
    <div>
        <RadioGroup
                :class="element.custom_class"
                v-if="element.ele_attr.group_type"
                v-model="element.ele_value"
                :vertical="element.ele_attr.group_vertical"
                :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                :type="element.ele_attr.group_type"
        >
            <Radio
                    v-for="(option, index) in element.options"
                    :key="index"
                    :label="option.label"
                    :disabled="option.disabled"
                    :border="element.ele_attr.border"
                    :true-value="option.true_value"
                    :false-value="option.false_value"
            >
                <template v-if="option.icon">
                    <Icon :type="option.icon"></Icon>
                    <span>{{ option.value }}</span>
                </template>
                <template v-else>
                    {{ option.value }}
                </template>
            </Radio>
        </RadioGroup>
        <RadioGroup
                v-else
                :class="element.custom_class"
                v-model="element.ele_value"
                :vertical="element.ele_attr.group_vertical"
                :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
        >
            <Radio
                    v-for="(option, index) in element.options"
                    :key="index"
                    :label="option.label"
                    :disabled="option.disabled"
                    :border="element.ele_attr.border"
                    :true-value="option.true_value"
                    :false-value="option.false_value"
            >
                <template v-if="option.icon">
                    <Icon :type="option.icon"></Icon>
                    <span>{{ option.value }}</span>
                </template>
                <template v-else>
                    {{ option.value }}
                </template>
            </Radio>
        </RadioGroup>
    </div>
</template>

<script>
    export default {
        name: "component-radio-group",
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