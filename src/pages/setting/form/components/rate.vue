<template>
    <div>
        <template v-if="element.ele_attr.rate_type === 'character'">
            <Rate
                    :class="element.custom_class"
                    v-width="element.ele_width"
                    v-model="element.ele_value"
                    :count="element.ele_attr.count"
                    :allow-half="element.ele_attr.allow_half"
                    :show-text="element.ele_attr.show_text"
                    :disabled="element.ele_attr.disabled"
                    :clearable="element.ele_attr.clearable"
                    :character="element.ele_attr.rate_custom"
                    :on-change="handleRateChange"
            />
        </template>
        <template v-else>
            <template v-if="element.ele_attr.is_custom">
                <Rate
                        :class="element.custom_class"
                        v-width="element.ele_width"
                        v-model="element.ele_value"
                        :count="element.ele_attr.count"
                        :allow-half="element.ele_attr.allow_half"
                        :show-text="element.ele_attr.show_text"
                        :disabled="element.ele_attr.disabled"
                        :clearable="element.ele_attr.clearable"
                        :custom-icon="formConfig.icon.font_family + ' ' + formConfig.icon.css_prefix_text + element.ele_attr.rate_custom"
                        :on-change="handleRateChange"
                />
            </template>
            <template v-else>
                <Rate
                        :class="element.custom_class"
                        v-width="element.ele_width"
                        v-model="element.ele_value"
                        :count="element.ele_attr.count"
                        :allow-half="element.ele_attr.allow_half"
                        :show-text="element.ele_attr.show_text"
                        :disabled="element.ele_attr.disabled"
                        :clearable="element.ele_attr.clearable"
                        :icon="element.ele_attr.rate_custom"
                        :on-change="handleRateChange"
                />
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "component-rate",
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
            handleRateChange () {
                console.log('handleRateChange');
            }
        }
    }
</script>

<style scoped>

</style>