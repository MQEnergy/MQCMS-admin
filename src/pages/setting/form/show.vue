<template>
    <div>
        <Form :class="formConfig.form.custom_class" ref="formInline" :model="formItem" :label-width="formConfig.form.label_width" :label-position="formConfig.form.label_position" >
            <div v-for="(element, index) in draggedList" :key="element.ele_hash" >
                <template v-if="element.ele_name === 'devider'">
                    <Divider
                            :orientation="element.ele_attr.orientation"
                            :type="element.ele_attr.type"
                            :dashed="element.ele_attr.dashed"
                            v-color="element.ele_attr.color"
                    >
                        {{ element.ele_value }}
                    </Divider>
                </template>
                <template v-if="element.ele_name !== 'devider'">
                    <FormItem :label="element.ele_title" :prop="element.ele_prop" :label-width="element.label_width">
                        <template v-if="element.ele_name === 'input'">
                            <Input
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
                        </template>
                        <template v-if="element.ele_name === 'radio_group'">
                            <RadioGroup
                                    :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                                    v-if="element.ele_attr.group_type"
                                    v-model="element.ele_value"
                                    :vertical="element.ele_attr.group_vertical"
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
                        </template>
                        <template v-if="element.ele_name === 'checkbox_group'">
                            <CheckboxGroup
                                    v-model="element.ele_value"
                                    :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
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
                        </template>
                        <template v-if="element.ele_name === 'datepicker'">
                            <template v-if="element.ele_attr.type === 'date' || element.ele_attr.type === 'datetime'">
                                <DatePicker
                                        style="width: 100%"
                                        :ref="'date_picker_' + element.ele_prop"
                                        :value="element.ele_value"
                                        :type="element.ele_attr.type"
                                        :format="element.ele_attr.format"
                                        :options="element.options"
                                        :placeholder="element.ele_attr.placeholder"
                                        :spellcheck="element.ele_attr.spellcheck"
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
                                        :ref="'date_picker_' + element.ele_prop"
                                        :value="element.ele_value"
                                        :type="element.ele_attr.type"
                                        :format="element.ele_attr.format"
                                        :options="element.options"
                                        :placeholder="element.ele_attr.placeholder"
                                        :spellcheck="element.ele_attr.spellcheck"
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
                        </template>
                        <template v-if="element.ele_name === 'select'">
                            <Select
                                    v-model="element.ele_value"
                                    :multiple="element.ele_attr.multiple"
                                    :disabled="element.ele_attr.disabled"
                                    :clearable="element.ele_attr.clearable"
                                    :filterable="element.ele_attr.filterable"
                                    :remote="element.ele_attr.remote"
                                    :remote-method="handleSelectRemoteMethod()"
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
                                    @on-change="handleSelectChange(element, index)"
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
                                    <span v-if="option.desc" style="float:right;color:#ccc">{{ option.desc }}</span>
                                </Option>
                            </Select>
                        </template>
                        <template v-if="element.ele_name === 'upload'">
                            <Tooltip placement="right-start" theme="light">
                                <div slot="content">
                                    <template v-if="element.ele_attr.ele_info && element.ele_attr.attach_full_url">
                                        <img v-if="element.ele_attr.attach_type === 1" :src="element.ele_attr.attach_full_url" style="width: 60px; height: 60px;" >
                                        <video v-if="element.ele_attr.attach_type === 2" style="width: 60px; height: 60px;" >
                                            <source :src="element.ele_attr.attach_full_url" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    </template>
                                    <template v-else>
                                        暂无预览
                                    </template>
                                </div>
                                <Button :size="element.ele_size" :icon="formConfig.upload.btn_icon" @click="handleUploadSeen(element, index)">{{ formConfig.upload.btn_title }}</Button>
                            </Tooltip>
                        </template>
                        <template v-if="element.ele_name === 'switch'">
                            <Switch
                                    v-model="element.ele_value"
                                    :size="formConfig.form.size_active ? formConfig.form.size : element.ele_size"
                                    :disabled="element.ele_attr.disabled"
                                    :true-value="element.ele_attr.true_value"
                                    :false-value="element.ele_attr.false_value"
                                    :true-color="element.ele_attr.true_color"
                                    :false-color="element.ele_attr.false_color"
                                    :before-change="handleSwitchBeforeChange()"
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
                                        <Icon :custom="formConfig.icon.font_family + ' ' + formConfig.icon.css_prefix_text + element.ele_attr.custom.type[0]" :slot="element.ele_attr.custom.slot[0]" size="12" />
                                        <Icon :custom="formConfig.icon.font_family + ' ' + formConfig.icon.css_prefix_text + element.ele_attr.custom.type[1]" :slot="element.ele_attr.custom.slot[1]" size="12" />
                                    </template>
                                </template>
                            </Switch>
                        </template>
                        <template v-if="element.ele_name === 'rate'">
                            <Rate
                                    v-model="element.ele_value"
                                    :count="element.ele_attr.count"
                                    :allow-half="element.ele_attr.allow_half"
                                    :show-text="element.ele_attr.show_text"
                                    :disabled="element.ele_attr.disabled"
                                    :clearable="element.ele_attr.clearable"
                                    :character="element.ele_attr.character"
                                    :icon="element.ele_attr.icon"
                                    :custom-icon="element.ele_attr.custom_icon"
                                    :on-change="handleRateChange"
                            />
                        </template>
                    </FormItem>
                </template>
            </div>
        </Form>
        <Modal
                v-model="uploadSeen"
                :title="formConfig.upload.modal_title"
                :width="formConfig.upload.modal_width"
                :mask-closable="formConfig.upload.modal_mask_closable"
                @on-ok="handleModalImgOk"
                @on-cancel="handleModalImgCancel">
            <upload-form
                    v-if="uploadSeen"
                    ref="uploadForm"
                    @on-success="handleSuccess"
                    @on-select-image="handleSelectImage"
                    :multiple="formConfig.upload.multiple"
                    :upload-url="formConfig.upload.upload_url"
                    :image-list-url="formConfig.upload.image_list_url"
                    :del-image-url="formConfig.upload.del_image_url"
                    :is-local="formConfig.upload.is_local"
                    :is-stock="formConfig.upload.is_stock"
                    :is-net="formConfig.upload.is_net"
                    :is-del="formConfig.upload.is_del"
                    :show-base-upload="formConfig.upload.show_base_upload"
            />
        </Modal>
    </div>
</template>

<script>
    import elements from './data';
    import UploadForm from '@/components/uploadform';

    export default {
        name: "show",
        components: {
            UploadForm
        },
        props: {
            draggedList: {
                type: Array,
                default: []
            }
        },
        data () {
            return {
                componentsList: elements.list,
                formConfig: elements.config,
                formItem: {},
                uploadSeen: false,
                currentElement: {}
            }
        },
        methods: {
            handleSelectRemoteMethod () {
                console.log('handleSelectRemoteMethod');
            },
            handleSelectChange (element, index) {
                this.currentElement = this.draggedList[index];
            },
            maxTagPlaceholder (num) {
                return this.currentElement.ele_attr.max_tag_placeholder + ' + ' + num + '...';
            },
            handleUploadSeen (item, index) {
                this.currentElement = item;
                this.uploadSeen = true;
            },
            handleSwitchBeforeChange () {
                console.log('handleSwitchBeforeChange');
            },
            handleRateChange () {
                console.log('handleRateChange');
            },
            handleSwitchChange (value) {
                this.$emit('on-switch-change', value);
            },
            handleModalImgOk () {
                if (this.currentElement.ele_attr.ele_info) {
                    this.currentElement.ele_value = this.currentElement.ele_attr.ele_info.attach_url;
                    this.currentElement.ele_attr.attach_full_url = this.currentElement.ele_attr.ele_info.attach_full_url;
                    this.currentElement.ele_attr.attach_type = this.currentElement.ele_attr.ele_info.attach_type;
                }
            },
            handleModalImgCancel () {
                this.uploadSeen = false;
            },
            handleSelectImage (item, index) {
                this.currentElement.ele_attr.ele_info = item;
            },
            handleSuccess () {
                console.log('handleSuccess');
            }
        }
    }
</script>

<style scoped>

</style>