<template>
    <div>
        <Select
                :class="element.custom_class"
                v-width="element.ele_width"
                v-model="element.ele_value"
                :multiple="element.ele_attr.multiple"
                :disabled="element.ele_attr.disabled"
                :clearable="element.ele_attr.clearable"
                :filterable="element.ele_attr.filterable"
                :remote="element.ele_attr.remote"
                :remote-method="handleSelectRemoteMethod"
                :loading="element.ele_attr.loading"
                :loading-text="element.ele_attr.loading_text"
                :label="element.ele_attr.label"
                :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                :placeholder="element.ele_attr.placeholder"
                :not-found-text="element.ele_attr.not_found_text"
                :label-in-value="element.ele_attr.label_in_value"
                :placement="element.ele_attr.placement"
                :transfer="element.ele_attr.transfer"
                :element-id="element.ele_attr.element_id"
                :transfer-class-name="element.ele_attr.transfer_class_name"
                :prefix="element.ele_attr.prefix"
                :max-tag-count="element.ele_attr.max_tag_count"
                :max-tag-placeholder="maxTagPlaceholder"
                :allow-create="element.ele_attr.allow_create"
                :capture="element.ele_attr.capture"
        >
            <Option
                    v-for="(option, index) in element.options"
                    :value="option.value"
                    :label="option.label"
                    :key="index"
                    :disabled="option.disabled"
                    :tag="option.tag"
            >
                <span>{{ option.label }}</span>
                <span v-if="option.desc" style="float: right; color: #ccc">{{ option.desc }}</span>
            </Option>
        </Select>
    </div>
</template>

<script>
    export default {
        name: "component-select",
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
        },
        data () {
            return {}
        },
        methods: {
            handleSelectRemoteMethod () {
                console.log('handleSelectRemoteMethod');
            },
            maxTagPlaceholder (num) {
                return this.element.ele_attr.max_tag_placeholder + ' + ' + num + '...';
            },
        }
    }
</script>

<style scoped>

</style>