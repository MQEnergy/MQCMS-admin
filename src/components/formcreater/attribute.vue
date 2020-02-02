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
    import AttributeInput from './attributes/input';
    import AttributeRadioGroup from './attributes/radio_group';
    import AttributeSelect from './attributes/select';
    import AttributeCheckboxGroup from "./attributes/checkbox_group";
    import AttributeDivider from "./attributes/divider";
    import AttributeSwitch from "./attributes/switch";
    import AttributeUpload from "./attributes/upload";
    import AttributeRate from "./attributes/rate";
    import AttributeDatepicker from "./attributes/datepicker";

    export default {
        name: "form-attribute",
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