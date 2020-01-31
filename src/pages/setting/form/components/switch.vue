<template>
    <div>
        <Switch
                :class="element.custom_class"
                v-width="element.ele_width"
                v-model="element.ele_value"
                :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                :disabled="element.ele_attr.disabled"
                :true-value="element.ele_attr.true_value"
                :false-value="element.ele_attr.false_value"
                :true-color="element.ele_attr.true_color"
                :false-color="element.ele_attr.false_color"
                :before-change="handleSwitchBeforeChange"
                :loading="element.ele_attr.loading"
                @on-change="handleSwitchChange"
        >
            <template v-if="element.ele_attr.custom.name === 'span'">
                <span :slot="element.ele_attr.custom.slot[0]">{{ element.ele_attr.custom.type[0] }}</span>
                <span :slot="element.ele_attr.custom.slot[1]">{{ element.ele_attr.custom.type[1] }}</span>
            </template>
            <template v-if="element.ele_attr.custom.name === 'icon'">
                <template v-if="!element.ele_attr.custom.is_custom">
                    <Icon :type="element.ele_attr.custom.type[0]" :slot="element.ele_attr.custom.slot[0]" />
                    <Icon :type="element.ele_attr.custom.type[1]" :slot="element.ele_attr.custom.slot[1]" />
                </template>
                <template v-else>
                    <Icon :class="formConfig.icon.font_family" :custom="formConfig.icon.css_prefix_text + element.ele_attr.custom.type[0]" :slot="element.ele_attr.custom.slot[0]" size="12" />
                    <Icon :class="formConfig.icon.font_family" :custom="formConfig.icon.css_prefix_text + element.ele_attr.custom.type[1]" :slot="element.ele_attr.custom.slot[1]" size="12" />
                </template>
            </template>
        </Switch>
    </div>
</template>

<script>
    export default {
        name: "component-switch",
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
            handleSwitchBeforeChange () {
                this.$emit('on-switch-before-change');
            },
            handleSwitchChange (value) {
                this.$emit('on-switch-change', value);
            },
        }
    }
</script>

<style scoped>

</style>