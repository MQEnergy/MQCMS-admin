<template>
    <div>
        <attribute-input v-if="currentElement.ele_name === 'input'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-radio-group v-if="currentElement.ele_name === 'radio_group'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-checkbox-group v-if="currentElement.ele_name === 'checkbox_group'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-select v-if="currentElement.ele_name === 'select'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-divider v-if="currentElement.ele_name === 'divider'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-switch v-if="currentElement.ele_name === 'switch'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-upload v-if="currentElement.ele_name === 'upload'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-rate v-if="currentElement.ele_name === 'rate'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
        <attribute-datepicker v-if="currentElement.ele_name === 'datepicker'" :current-element="currentElement" :form-config="formConfig" @on-element-size="handleElementSize" />
    </div>
</template>

<script>
    import AttributeInput from '@/pages/setting/form/attributes/input';
    import AttributeRadioGroup from '@/pages/setting/form/attributes/radio_group';
    import AttributeSelect from '@/pages/setting/form/attributes/select';
    import AttributeCheckboxGroup from "@/pages/setting/form/attributes/checkbox_group";
    import AttributeDivider from "@/pages/setting/form/attributes/divider";
    import AttributeSwitch from "@/pages/setting/form/attributes/switch";
    import AttributeUpload from "@/pages/setting/form/attributes/upload";
    import AttributeRate from "@/pages/setting/form/attributes/rate";
    import AttributeDatepicker from "@/pages/setting/form/attributes/datepicker";

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
            AttributeDatepicker,
            AttributeRate,
            AttributeUpload,
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