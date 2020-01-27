<template>
    <div class="ivu-pt-16">
        <Row :gutter="24">
            <Col :xl="6" :lg="6" :md="24" :sm="24" :xs="24" class="ivu-mb">
                <Card :bordered="false" dis-hover>
                    <p style="margin-bottom: 20px; font-weight: bold">基础组件</p>
                    <div class="list-group-container">
                        <Row :gutter="10">
                            <draggable v-model="componentsList" v-bind="dragOptionsLeft" :move="onMove" @clone="onClone" @start="onStart" @end="onEnd" >
                                <transition-group type="transition" :name="'flip-list'" class="list-group" tag="div">
                                    <Col :span="12" v-for="element in componentsList" :key="element.ele_id" style="margin-bottom: 10px">
                                        <Button class="list-group-item" long type="dashed" >{{ element.ele_title }}</Button>
                                    </Col>
                                </transition-group>
                            </draggable>
                        </Row>
                    </div>
                </Card>
            </Col>
            <Col :xl="10" :lg="10" :md="24" :sm="24" :xs="24">
                <Card :bordered="false" dis-hover>
                    <div style="margin-bottom: 20px; font-weight: bold">
                        可视区域
                        <div style="float: right; ">
                            <Dropdown placement="bottom-end" @on-click="handleDropDownClick">
                                <a href="javascript:void(0)">
                                    <Icon type="md-more" />
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="show"><Icon type="md-eye" /> 预览</DropdownItem>
                                    <DropdownItem name="create"><Icon type="md-list-box" /> 生成代码</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="list-group-container">
                        <Row :gutter="10">
                            <Col :span="24" v-if="draggedList.length === 0">
                                <div v-if="!isDragging" style="height: 20px; text-align: center; color: #999">
                                    <empty empty-text="请将左边组件拖入到可视区域" :is-back="false" />
                                </div>
                            </Col>
                            <Form :class="formConfig.form.custom_class" ref="formInline" :model="formItem" :label-width="formConfig.form.label_width" :label-position="formConfig.form.label_position" >
                                <draggable element="div" v-model="draggedList" v-bind="dragOptionsRight">
                                     <transition-group class="list-group" tag="div">
                                         <Col class="list-group-item" :span="24" v-for="(element, index) in draggedList" :key="element.ele_hash" :class="[element.is_active ? 'active' : '']">
                                             <div v-if="element.is_active" class="active-absolute">
                                                 <div @click="handleFormItemClose(element, index)" class="active-absolute-close">
                                                     <Icon class="md-close" type="md-close" />
                                                 </div>
                                             </div>
                                             <div @click="handleFormItemClick(element, index)" >
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
                                                                 :max-tag-placeholder="handleSelectMaxTagPlaceholder()"
                                                                 :allow-create="element.ele_attr.allow_create"
                                                                 :capture="element.ele_attr.capture"
                                                         >
                                                             <Option
                                                                     v-for="(option, index) in element.options"
                                                                     :value="option.value"
                                                                     :key="index"
                                                                     :disabled="option.disabled"
                                                                     :tag="option.tag"
                                                             >{{ option.label }}</Option>
                                                         </Select>
                                                     </template>
                                                     <template v-if="element.ele_name === 'upload'">
                                                         <Button :size="element.ele_size" :icon="formConfig.upload.btn_icon" @click="handleUploadSeen">{{ formConfig.upload.btn_title }}</Button>
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
                                                         />
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
                                                <!-- slot额外form_item表单 -->
                                                <slot name="content"></slot>
                                             </div>
                                         </Col>
                                     </transition-group>
                                </draggable>
                                <Modal
                                    v-model="uploadSeen"
                                    :title="formConfig.upload.modal_title"
                                    :width="formConfig.upload.modal_width"
                                    :mask-closable="formConfig.upload.modal_mask_closable"
                                    @on-ok="handleModalOk"
                                    @on-cancel="handleModalCancel">
                                    <upload-form
                                        v-if="uploadSeen"
                                        ref="uploadForm"
                                        @on-success="handleSuccess"
                                        @on-show-image="handleShowImage"
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
                            </Form>
                        </Row>
                    </div>
                </Card>
            </Col>
            <Col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
                <Card :bordered="false" dis-hover>
                    <p style="margin-bottom: 20px; font-weight: bold">属性设置</p>
                    <div class="list-group-container">
                        <Tabs type="card">
                            <TabPane label="字段属性">
                                <div v-if="currentElement">
                                    <Form
                                        ref="currentFormInline"
                                        :model="currentElement"
                                        label-position="top"
                                    >
                                        <FormItem label="字段hash">
                                            <Input disabled v-model="currentElement.ele_hash" placeholder="请输入字段标识" />
                                        </FormItem>
                                        <FormItem label="组件类型(type)">
                                            <Select v-model="currentElement.ele_attr.type">
                                                <Option value="text">text</Option>
                                                <Option value="textarea">textarea</Option>
                                                <Option value="password">password</Option>
                                                <Option value="number">number</Option>
                                                <Option value="url">url</Option>
                                                <Option value="email">email</Option>
                                                <Option value="date">date</Option>
                                                <Option value="tel">tel</Option>
                                            </Select>
                                        </FormItem>
                                        <FormItem label="字段prop">
                                            <Input v-model="currentElement.ele_prop" placeholder="请输入字段prop" />
                                        </FormItem>
                                        <FormItem label="字段标题(label)">
                                            <Input v-model="currentElement.ele_title" placeholder="请输入字段标题" />
                                        </FormItem>
                                        <FormItem label="占位内容(placeholder)">
                                            <Input v-model="currentElement.ele_attr.placeholder" placeholder="请输入占位内容" />
                                        </FormItem>
                                        <FormItem label="标签宽度(label-width)">
                                            <InputNumber :max="200" :min="0" :step="10" v-model="currentElement.label_width"  placeholder="请输入字段宽度"></InputNumber>
                                        </FormItem>
                                        <FormItem label="组件尺寸">
                                            <RadioGroup v-model="currentElement.ele_size" @on-change="handleElementSize(1)" type="button">
                                                <Radio label="default">default</Radio>
                                                <Radio label="small">small</Radio>
                                                <Radio label="large">large</Radio>
                                            </RadioGroup>
                                        </FormItem>
                                        <FormItem label="初始值(value)">
                                            <Input v-if="currentElement.ele_name === 'input'" v-model="currentElement.ele_value" placeholder="请输入初始值" />
                                            <CheckboxGroup
                                                    v-if="currentElement.ele_name === 'checkbox_group'"
                                                    v-model="currentElement.ele_value"
                                                    :size="formConfig.form.size_active ? formConfig.form.size : currentElement.ele_size"
                                            >
                                                <Checkbox
                                                        v-for="(option, index) in currentElement.options"
                                                        :key="index"
                                                        :label="option.label"
                                                        :disabled="option.disabled"
                                                        :indeterminate="currentElement.ele_attr.indeterminate"
                                                        :true-value="option.true_value"
                                                        :false-value="option.false_value"
                                                        :border="currentElement.ele_attr.border"
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
                                        </FormItem>
                                        <FormItem label="其他属性">
                                            <div style="position: absolute; top: -35px; left: 60px; width: 130px; cursor: pointer">
                                                <Tooltip max-width="130" content="这些参数与iview参数一致，不明白的可以查看iview文档" placement="top">
                                                    <Icon type="md-help-circle" />
                                                </Tooltip>
                                            </div>
                                            <Checkbox v-model="currentElement.ele_attr.clearable">clearable</Checkbox>
                                            <Checkbox v-model="currentElement.ele_attr.disabled">disabled</Checkbox>
                                            <Checkbox v-model="currentElement.ele_attr.readonly">readonly</Checkbox>
                                            <Checkbox v-model="currentElement.ele_attr.show_word_limit">
                                                show-word-limit
                                                <Tooltip max-width="130" content="是否显示输入字数统计" placement="top">
                                                    <Icon type="md-help-circle" />
                                                </Tooltip>
                                            </Checkbox>
                                            <Input type="number" v-if="currentElement.ele_attr.show_word_limit" v-model="currentElement.ele_attr.maxlength" placeholder="输入最大长度" />
                                            <div v-if="currentElement.ele_attr.type === 'textarea'">
                                                行数：
                                                <Input v-model="currentElement.ele_attr.rows" placeholder="文本域默认行数" />
                                            </div>
                                            <Checkbox v-if="currentElement.ele_attr.type === 'password'" v-model="currentElement.ele_attr.password">
                                                password
                                                <Tooltip max-width="130" content="是否显示切换密码图标" placement="top">
                                                    <Icon type="md-help-circle" />
                                                </Tooltip>
                                            </Checkbox>
                                            <Checkbox v-if="currentElement.ele_attr.type === 'text'" v-model="currentElement.ele_attr.search">
                                                search
                                                <Tooltip max-width="130" content="是否显示为搜索型输入框，配合enter-button参数" placement="top">
                                                    <Icon type="md-help-circle" />
                                                </Tooltip>
                                            </Checkbox>
                                            <Checkbox v-if="currentElement.ele_attr.search" v-model="currentElement.ele_attr.enter_button">enter-button</Checkbox>
                                            <Checkbox v-if="currentElement.ele_attr.type === 'textarea'" v-model="currentElement.ele_attr.autosize">autosize</Checkbox>
                                            <Checkbox v-model="currentElement.ele_attr.number">
                                                number
                                                <Tooltip max-width="130" content="将用户的输入转换为 Number 类型" placement="top">
                                                    <Icon type="md-help-circle" />
                                                </Tooltip>
                                            </Checkbox>
                                            <Checkbox v-model="currentElement.ele_attr.autofocus">autofocus
                                                <Tooltip max-width="130" content="自动获取焦点" placement="top">
                                                    <Icon type="md-help-circle" />
                                                </Tooltip>
                                            </Checkbox>
                                        </FormItem>
                                    </Form>
                                </div>
                            </TabPane>
                            <TabPane label="表单属性">
                                <Form
                                    :model="formConfig"
                                    label-position="top"
                                >
                                    <FormItem label="标签对齐方式">
                                        <RadioGroup v-model="formConfig.form.label_position" type="button">
                                            <Radio label="left">左对齐</Radio>
                                            <Radio label="right">右对齐</Radio>
                                            <Radio label="top">顶部对齐</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem label="表单标签宽度">
                                        <InputNumber :max="200" :min="0" :step="10" v-model="formConfig.form.label_width"></InputNumber>
                                    </FormItem>
                                    <FormItem label="组件尺寸">
                                        <RadioGroup v-model="formConfig.form.size" @on-change="handleElementSize(2)" type="button">
                                            <Radio label="default">default</Radio>
                                            <Radio label="small">small</Radio>
                                            <Radio label="large">large</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem label="组件class">
                                        <Input v-model="formConfig.form.custom_class" placeholder="请输入class属性" />
                                    </FormItem>
                                </Form>
                            </TabPane>
                        </Tabs>
                        <pre>{{ listString }}</pre>
                    </div>
                </Card>
            </Col>
        </Row>
        <!-- 预览 -->
        <Modal
                v-model="elementShowSeen"
                :title="formConfig.show.modal_title"
                :width="formConfig.show.modal_width"
                :mask-closable="formConfig.show.modal_mask_closable"
                @on-ok="handleModalOk"
                @on-cancel="handleModalCancel">
            <show :dragged-list="draggedList" />
        </Modal>
    </div>
</template>
<script>
    import draggable from "vuedraggable";
    import random_str from "@/libs/random_str";
    import UploadForm from '@/components/uploadform';
    import Empty from '@/components/common/empty';
    import elements from './data';
    import Show from './show';

    export default {
        name: 'setting-form',
        components: {
            draggable,
            UploadForm,
            Empty,
            Show
        },
        data () {
            return {
                componentsList: elements.list,
                formConfig: elements.config,
                currentElement: undefined,
                draggedList: [],
                editable: true,
                isDragging: false,
                delayedDragging: false,
                formItem: {},
                uploadSeen: false,
                elementShowSeen: false
            }
        },
        methods: {
            onMove({ relatedContext, draggedContext }) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                const draggedIndex = draggedContext.index;
                return true;
            },
            onStart (value) {
                this.isDragging = true;
            },
            onClone (value) {
            },
            onEnd (value) {
                this.isDragging = false;
                const draggedList = JSON.parse(JSON.stringify(this.draggedList));
                if (draggedList.length > 0) {
                    draggedList.forEach((item, index) => {
                        if (item.ele_attr.element_id !== undefined) {
                            item.ele_attr.element_id = 'mq-' + new Date().getTime() + '-' + index;
                        }
                        item.ele_hash = 'mq-' + random_str(16) + '-' + index;
                        item.is_active = false;
                    });
                    draggedList[value.newIndex].is_active = true;
                    this.draggedList = draggedList;
                    this.currentElement = draggedList[value.newIndex];
                }
            },
            handleSwitchChange (value) {
                this.$emit('on-switch-change', value);
            },
            handleUploadSeen () {
                this.uploadSeen = true;
            },
            handleModalOk () {
                console.log('handleModalOk');
            },
            handleModalCancel () {
                this.uploadSeen = false;
            },
            handleSuccess () {
                console.log('handleSuccess');
            },
            handleShowImage () {
                console.log('handleShowImage');
            },
            handleSelectRemoteMethod () {
                console.log('handleSelectRemoteMethod');
            },
            handleSelectMaxTagPlaceholder () {
                console.log('handleSelectMaxTagPlaceholder');
            },
            handleDatePickerClick () {
                console.log('handleDatePickerClick');
            },
            handleDatePickerDisableDate () {
                console.log('handleDatePickerDisableDate');
            },
            handleSwitchBeforeChange () {
                console.log('handleSwitchBeforeChange');
            },
            handleRateChange () {
                console.log('handleRateChange');
            },
            handleFormItemClick (element, index) {
                this.draggedList.forEach((item, key) => {
                    if (key !== index) {
                        item.is_active = false;
                    }
                });
                this.draggedList[index].is_active = !this.draggedList[index].is_active;
                this.currentElement = this.draggedList[index];
            },
            handleFormItemClose (element, index) {
                this.currentElement = undefined;
                this.draggedList.splice(index, 1);
            },
            handleDropDownClick (name) {
                if (name === 'show') {
                    this.elementShowSeen = true;
                    console.log(this.currentElement)
                }
            },
            handleElementSize (type) {
                if (type === 1) {
                    this.formConfig.form.size_active = false;
                } else {
                    this.formConfig.form.size_active = true;
                    this.draggedList.forEach((item, index) => {
                        item.ele_size = this.formConfig.form.size;
                    });
                }
            }
        },
        computed: {
            dragOptionsLeft () {
                return {
                    group: {
                        name: 'shared',
                        pull: 'clone',
                        put: false
                    },
                    disabled: !this.editable,
                    animation: 150,
                    sort: false
                };
            },
            dragOptionsRight () {
                return {
                    group: 'shared',
                    animation: 150
                };
            },
            listString () {
                return JSON.stringify(this.draggedList, null, 2);
            }
        },
        watch: {
            isDragging(newValue) {
                if (newValue) {
                    this.delayedDragging = true;
                    return;
                }
                this.$nextTick(() => {
                    this.delayedDragging = false;
                });
            }
        }
    }
</script>
<style lang="less">
    .flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .list-group-container {
        height: 585px;
        max-height: 800px;
        overflow-y: scroll
    }
    .list-group {
        min-height: 585px;
        padding: 10px;
    }
    .list-group-item {
        cursor: move;
        position: relative;
    }
    .list-group-item i {
        cursor: pointer;
    }
    .active {
        position: relative;
        border: 3px solid #57a3f3;
        .active-absolute {
            position: absolute;
            width: 100%;
            right: -3px;
            bottom: 27px;
            &-close {
                z-index: 10;
                position: absolute;
                background: #57a3f3;
                height: 30px;
                width: 30px;
                right: 0px;
                top: 0px;
                text-align: center;
                line-height: 30px;
                .md-close {
                    font-size: 20px;
                    color: #fff;
                }
            }
        }
    }
</style>
