<template>
    <div>
        <Input
                :class="element.custom_class"
                v-width="element.ele_width"
                v-model="element.ele_value"
                :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                :type="element.ele_attr.type"
                :element-id="element.ele_attr.element_id"
                :placeholder="element.ele_attr.placeholder"
                :clearable="element.ele_attr.clearable"
                :disabled="element.ele_attr.disabled"
                :readonly="element.ele_attr.readonly"
                :maxlength="element.ele_attr.maxlength"
                :show-word-limit="element.ele_attr.show_word_limit"
                :password="element.ele_attr.password"
                :icon="element.ele_attr.icon"
                :prefix="element.ele_attr.prefix"
                :suffix="element.ele_attr.suffix"
                :search="element.ele_attr.search"
                :enter-button="element.ele_attr.enter_button"
                :rows="element.ele_attr.rows"
                :autosize="element.ele_attr.autosize"
                :number="element.ele_attr.number"
                :autofocus="element.ele_attr.autofocus"
                :autocomplete="element.ele_attr.autocomplete"
                :spellcheck="element.ele_attr.spellcheck"
                :wrap="element.ele_attr.wrap"
        />
    </div>
</template>

<script>
    export default {
        name: "component-input",
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