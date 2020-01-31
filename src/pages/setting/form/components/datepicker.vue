<template>
    <div>
        <template v-if="element.ele_attr.type === 'date' || element.ele_attr.type === 'datetime'">
            <DatePicker
                    :class="element.custom_class"
                    v-width="element.ele_width ? element.ele_width : '100%'"
                    :ref="'date_picker_' + element.ele_prop"
                    :value="element.ele_value"
                    :type="element.ele_attr.type"
                    :format="element.ele_attr.format"
                    :options="element.options"
                    :placeholder="element.ele_attr.placeholder"
                    :multiple="element.ele_attr.multiple"
                    :show-week-numbers="element.ele_attr.show_week_numbers"
                    :start-date="new Date(element.ele_attr.start_date_year, element.ele_attr.start_date_month, element.ele_attr.start_date_day)"
                    :confirm="element.ele_attr.confirm"
                    :open="element.ele_attr.open"
                    :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                    :disabled="element.ele_attr.disabled"
                    :clearable="element.ele_attr.clearable"
                    :readonly="element.ele_attr.readonly"
                    :editable="element.ele_attr.editable"
                    :transfer="element.ele_attr.transfer"
                    :element-id="element.ele_attr.element_id"
                    :time-picker-options="element.ele_attr.time_picker_options"
                    :separator="element.ele_attr.separator"
                    :capture="element.ele_attr.capture"
            >
            </DatePicker>
        </template>
        <template v-if="element.ele_attr.type === 'daterange' || element.ele_attr.type === 'datetimerange'">
            <DatePicker
                    :class="element.custom_class"
                    v-width="element.ele_width ? element.ele_width : '100%'"
                    :ref="'date_picker_' + element.ele_prop"
                    :value="element.ele_value"
                    :type="element.ele_attr.type"
                    :format="element.ele_attr.format"
                    :options="element.options"
                    :placeholder="element.ele_attr.placeholder"
                    :split-panels="element.ele_attr.split_panels"
                    :show-week-numbers="element.ele_attr.show_week_numbers"
                    :start-date="new Date(element.ele_attr.start_date_year, element.ele_attr.start_date_month, element.ele_attr.start_date_day)"
                    :confirm="element.ele_attr.confirm"
                    :open="element.ele_attr.open"
                    :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                    :disabled="element.ele_attr.disabled"
                    :clearable="element.ele_attr.clearable"
                    :readonly="element.ele_attr.readonly"
                    :editable="element.ele_attr.editable"
                    :transfer="element.ele_attr.transfer"
                    :element-id="element.ele_attr.element_id"
                    :time-picker-options="element.ele_attr.time_picker_options"
                    :separator="element.ele_attr.separator"
                    :capture="element.ele_attr.capture"
            >
            </DatePicker>
        </template>
        <template v-if="element.ele_attr.type === 'year' || element.ele_attr.type === 'month'">
            <DatePicker
                    :class="element.custom_class"
                    v-width="element.ele_width ? element.ele_width : '100%'"
                    :ref="'date_picker_' + element.ele_prop"
                    :value="element.ele_value"
                    :type="element.ele_attr.type"
                    :options="element.options"
                    :placeholder="element.ele_attr.placeholder"
                    :show-week-numbers="element.ele_attr.show_week_numbers"
                    :start-date="element.ele_attr.type === 'year' ? new Date(element.ele_attr.start_date_year) : new Date(element.ele_attr.start_date_year, element.ele_attr.start_date_month)"
                    :confirm="element.ele_attr.confirm"
                    :open="element.ele_attr.open"
                    :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                    :disabled="element.ele_attr.disabled"
                    :clearable="element.ele_attr.clearable"
                    :readonly="element.ele_attr.readonly"
                    :editable="element.ele_attr.editable"
                    :transfer="element.ele_attr.transfer"
                    :element-id="element.ele_attr.element_id"
                    :capture="element.ele_attr.capture"
            >
            </DatePicker>
        </template>
    </div>
</template>

<script>
    export default {
        name: "component-datepicker",
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