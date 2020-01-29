<template>
    <div>
        <attribute-input v-if="currentElement.ele_name === 'input'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-radio-group v-if="currentElement.ele_name === 'radio_group'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-checkbox-group v-if="currentElement.ele_name === 'checkbox_group'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-select v-if="currentElement.ele_name === 'select'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-divider v-if="currentElement.ele_name === 'devider'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-switch v-if="currentElement.ele_name === 'switch'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />

    </div>
</template>

<script>
    import AttributeInput from '@/pages/setting/form/attributes/input';
    import AttributeRadioGroup from '@/pages/setting/form/attributes/radio_group';
    import AttributeSelect from '@/pages/setting/form/attributes/select';
    import AttributeCheckboxGroup from "@/pages/setting/form/attributes/checkbox_group";
    import AttributeDivider from "@/pages/setting/form/attributes/divider";
    import AttributeSwitch from "@/pages/setting/form/attributes/switch";

    export default {
        name: "attribute",
        props: {
            currentElement: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            formConfig: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        components: {
            AttributeSwitch,
            AttributeDivider,
            AttributeCheckboxGroup,
            AttributeInput,
            AttributeRadioGroup,
            AttributeSelect
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