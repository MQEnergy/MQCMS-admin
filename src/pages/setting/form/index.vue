<template>
    <div class="ivu-pt-16">
        <Row :gutter="24">
            <Col :xl="6" :lg="6" :md="24" :sm="24" :xs="24" class="ivu-mb">
                <Card :bordered="false" dis-hover>
                    <p style="margin-bottom: 20px; font-weight: bold">基础组件</p>
                    <div style="height: 600px; max-height: 800px; overflow-y: scroll">
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
                    <p style="margin-bottom: 20px; font-weight: bold">可视区域</p>
                    <div style="height: 600px; max-height: 800px; overflow-y: scroll">
                        <Row :gutter="10">
                            <Form :model="formItem" :label-width="labelWidth" >
                                <Col :span="24" v-if="draggedList.length === 0">
                                    <div style="height: 20px; text-align: center; color: #999">
                                        <empty empty-text="请将左边组件拖入到可视区域" :is-back="false" />
                                    </div>
                                </Col>
                                <draggable element="div" v-model="draggedList" v-bind="dragOptionsRight">
                                     <transition-group class="list-group" tag="div">
                                         <Col class="list-group-item" :span="24" v-for="element in draggedList" :key="element.ele_hash">
                                             <FormItem :label="element.ele_title" :prop="element.ele_prop" :label-width="element.label_width">
                                                 <template v-if="element.ele_name === 'input'">
                                                     <Input :type="element.ele_attr.type" v-model="element.ele_value" :element-id="element.ele_hash" :placeholder="element.ele_attr.placeholder" />
                                                 </template>
                                                 <template v-if="element.ele_name === 'radio_group'">
                                                     <RadioGroup v-if="element.ele_attr.group_type" v-model="element.ele_value" :type="element.ele_attr.group_type">
                                                         <Radio v-for="(option, index) in element.options" :key="index" :label="option.label">{{ option.value }}</Radio>
                                                     </RadioGroup>
                                                     <RadioGroup v-else v-model="element.ele_value" >
                                                         <Radio v-for="(option, index) in element.options" :key="index" :label="option.label">{{ option.value }}</Radio>
                                                     </RadioGroup>
                                                 </template>
                                                 <template v-if="element.ele_name === 'checkbox_group'">
                                                     <CheckboxGroup v-model="element.ele_value">
                                                         <Checkbox v-for="option in element.options" :label="option.label"></Checkbox>
                                                     </CheckboxGroup>
                                                 </template>
                                                 <template v-if="element.ele_name === 'datepicker'">
                                                     <DatePicker
                                                             :ref="'date_picker_' + element.ele_prop"
                                                             :value="element.ele_value"
                                                             :type="element.ele_attr.type"
                                                             :format="element.format"
                                                             :options="element.options"
                                                             :placeholder="element.ele_attr.placeholder">
                                                     </DatePicker>
                                                 </template>
                                                 <template v-if="element.ele_name === 'select'">
                                                     <Select v-model="element.ele_value" clearable>
                                                         <Option v-for="(option, index) in element.options" :value="option.value" :key="index">{{ option.label }}</Option>
                                                     </Select>
                                                 </template>
                                                 <template v-if="element.ele_name === 'select_multi'">
                                                     <Select v-model="element.ele_value" clearable multiple>
                                                         <Option v-for="(option, index) in element.options" :value="option.value" :key="index">{{ option.label }}</Option>
                                                     </Select>
                                                 </template>
                                                 <template v-if="element.ele_name === 'upload'">
                                                     <Button :icon="element.ele_attr.btn_icon" @click="handleUpload">{{ element.ele_attr.btn_title }}</Button>
                                                     <Modal
                                                             v-model="uploadSeen"
                                                             title="选择图片"
                                                             width="800"
                                                             :mask-closable="false"
                                                             @on-ok="handleOk"
                                                             @on-cancel="handleCancel">
                                                         <upload-form ref="uploadForm"
                                                                      @on-success="handleSuccess"
                                                                      @on-show-image="handleShowImage"
                                                                      :multiple="false" />
                                                     </Modal>
                                                 </template>
                                                 <template v-if="element.ele_name === 'switch'">
                                                     <Switch v-model="element.ele_value" @on-change="handleSwitchChange" />
                                                 </template>
                                                 <template v-if="element.ele_name === 'rate'">
                                                     <Rate
                                                             :count="element.ele_attr.count"
                                                             :allow-half="element.ele_attr.allow_half"
                                                             :show-text="element.ele_attr.show_text"
                                                             :disabled="element.ele_attr.disabled"
                                                             :clearable="element.ele_attr.clearable"
                                                             :character="element.ele_attr.character"
                                                             :icon="element.ele_attr.icon"
                                                             :custom-icon="element.ele_attr.custom_icon"
                                                             v-model="element.ele_value" />
                                                 </template>
                                             </FormItem>
                                         </Col>
                                     </transition-group>
                                </draggable>
                            </Form>
                        </Row>
                    </div>
                </Card>
            </Col>
            <Col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
                <Card :bordered="false" dis-hover>
                    <p style="margin-bottom: 20px; font-weight: bold">属性设置</p>
                    <div style="height: 600px; max-height: 800px; overflow-y: scroll">
                        <pre>{{ listString }}</pre>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import draggable from "vuedraggable";
    import random_str from "@/libs/random_str";
    import UploadForm from '@/components/uploadform';
    import Empty from '@/components/common/empty';
    import elements from './data';
    export default {
        name: 'setting-form',
        components: {
            draggable,
            UploadForm,
            Empty
        },
        data () {
            return {
                componentsList: elements,
                draggedList: [],
                editable: true,
                isDragging: false,
                delayedDragging: false,
                formItem: {},
                labelWidth: 80,
                uploadSeen: false
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
                for (let i = 0; i < draggedList.length; i++) {
                    draggedList[i].ele_hash = 'mq-' + random_str() + '-' + i;
                }
                this.draggedList = draggedList;
            },
            handleSwitchChange (value) {
                this.$emit('on-switch-change', value);
            },
            handleUpload () {
                this.uploadSeen = true;
            },
            handleOk () {
                console.log('OK')
            },
            handleCancel () {
                this.uploadSeen = false;
            },
            handleSuccess () {
                console.log('OK')
            },
            handleShowImage () {
                console.log('OK')
            },
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
    .list-group {
        min-height: 600px;
    }
    .list-group-item {
        cursor: move;
    }
    .list-group-item i {
        cursor: pointer;
    }
</style>
