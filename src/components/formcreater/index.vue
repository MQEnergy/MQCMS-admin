<template>
    <div class="ivu-pt-16">
        <Row :gutter="16">
            <Col :xl="6" :lg="6" :md="24" :sm="24" :xs="24" class="ivu-mb">
                <Card :bordered="false" dis-hover>
                    <div slot="title">基础组件</div>
                    <div class="list-group-container">
                        <Row :gutter="10">
                            <draggable v-model="componentsList" v-bind="dragOptionsLeft" :move="onMove" @clone="onClone" @start="onStart" @end="onEnd" >
                                <transition-group type="transition" :name="'flip-list'" tag="div">
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
                    <div slot="title">
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
                                                 <template v-if="element.ele_name === 'divider'">
                                                     <component-divider :element="element" :index="index" :form-config="formConfig" />
                                                 </template>
                                                 <div v-else>
                                                     <FormItem :label="element.ele_title" :prop="element.ele_prop" :label-width="element.label_width">
                                                         <template v-if="element.ele_name === 'input'">
                                                             <component-input :element="element" :index="index" :form-config="formConfig" />
                                                         </template>
                                                         <template v-if="element.ele_name === 'radio_group'">
                                                             <component-radio-group :element="element" :index="index" :form-config="formConfig" />
                                                         </template>
                                                         <template v-if="element.ele_name === 'checkbox_group'">
                                                             <component-checkbox-group :element="element" :index="index" :form-config="formConfig" />
                                                         </template>
                                                         <template v-if="element.ele_name === 'datepicker'">
                                                             <component-datepicker :element="element" :index="index" :form-config="formConfig" />
                                                         </template>
                                                         <template v-if="element.ele_name === 'select'">
                                                             <component-select :element="element" :index="index" :form-config="formConfig" />
                                                         </template>
                                                         <template v-if="element.ele_name === 'upload'">
                                                             <component-upload :element="element" :index="index" :form-config="formConfig" />
                                                         </template>
                                                         <template v-if="element.ele_name === 'switch'">
                                                             <component-switch :element="element" :index="index"
                                                                               @on-switch-change="handleSwitchChange"
                                                                               @on-switch-before-change="handleSwitchBeforeChange"
                                                                               :form-config="formConfig" />
                                                         </template>
                                                         <template v-if="element.ele_name === 'rate'">
                                                             <component-rate :element="element" :index="index" :form-config="formConfig" />
                                                         </template>
                                                     </FormItem>
                                                 </div>
                                                 <!-- slot额外form_item表单 -->
                                                 <slot name="form-item"></slot>
                                             </div>
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
                    <div slot="title">属性设置</div>
                    <div class="list-group-container" style="overflow-y: hidden">
                        <Tabs type="card">
                            <TabPane label="字段属性">
                                <div style="height: 535px; overflow-y: scroll">
                                    <empty v-if="currentElement === undefined" empty-text="请选择左边可视区域中的元素" :is-back="false" />
                                    <attribute @on-element-size="handleElementSize" :current-element="currentElement" :form-config="formConfig" />
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
                                    <FormItem label="自定义表单class">
                                        <Input v-model="formConfig.form.custom_class" placeholder="请输入class属性" />
                                    </FormItem>
                                </Form>
                            </TabPane>
                            <TabPane label="组件json数据">
                                <div style="height: 535px; overflow-y: scroll">
                                    <empty v-if="currentElement === undefined" empty-text="请选择左边可视区域中的元素" :is-back="false" />
                                    <div v-else>
                                        <codemirror ref="CodeMirror" class="mq-code-mirror" v-model="listString" :options="cmOptions" />
                                        <p style="text-align: center"><Button @click="handleCopyCode">复制代码</Button></p>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
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
                @on-ok="handleModalShowOk"
                @on-cancel="handleModalShowCancel">
            <show v-if="elementShowSeen" :dragged-list="draggedList" />
        </Modal>
    </div>
</template>
<script>
    import { codemirror } from 'vue-codemirror';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/theme/material.css';
    // import 'codemirror/theme/duotone-light.css';
    // import 'codemirror/theme/xq-light.css';
    // import 'codemirror/theme/dracula.css';
    import 'codemirror/mode/javascript/javascript';

    import Draggable from "vuedraggable";
    import random_str from "@/libs/random_str";
    import UploadForm from '@/components/uploadform';
    import Empty from '@/components/common/empty';
    import elements from './data';
    import Show from './show';
    import Attribute from './attribute';
    import ComponentInput from "./components/input";
    import ComponentRadioGroup from "./components/radio_group";
    import ComponentCheckboxGroup from "./components/checkbox_group";
    import ComponentDatepicker from "./components/datepicker";
    import ComponentSelect from "./components/select";
    import ComponentUpload from "./components/upload";
    import ComponentSwitch from "./components/switch";
    import ComponentRate from "./components/rate";
    import ComponentDivider from "./components/divider";

    export default {
        name: 'form-creater',
        components: {
            ComponentDivider,
            ComponentRate,
            ComponentSwitch,
            ComponentUpload,
            ComponentSelect,
            ComponentDatepicker,
            ComponentCheckboxGroup,
            ComponentRadioGroup,
            ComponentInput,
            Draggable,
            UploadForm,
            Empty,
            Show,
            Attribute,
            codemirror
        },
        data () {
            return {
                componentsList: elements.list,
                formConfig: elements.config,
                currentElement: undefined,
                currentIndex: undefined,
                draggedList: [],
                editable: true,
                isDragging: false,
                delayedDragging: false,
                formItem: {},
                elementShowSeen: false,
                elementCreateSeen: false,
                cmOptions: {
                    tabSize: 4,
                    mode: 'application/json',
                    theme: 'material',
                    // theme: 'duotone-light',
                    // theme: 'xq-light',
                    // theme: 'dracula',
                    lineNumbers: true,
                    line: true,
                }
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
                        const currentTime = new Date().getTime();
                        if (item.ele_attr.element_id !== undefined) {
                            item.ele_attr.element_id = 'mq-' + currentTime + '-' + index;
                        }
                        item.ele_hash = 'mq-' + random_str(16) + '-' + index;
                        item.is_active = false;
                    });
                    if (draggedList[value.newIndex]) {
                        draggedList[value.newIndex].is_active = true;
                        this.currentElement = draggedList[value.newIndex];
                        this.currentIndex = value.newIndex;
                    }
                    this.draggedList = draggedList;
                }
            },
            handleModalShowOk () {
                console.log('handleModalShowOk');
            },
            handleModalShowCancel () {
                this.elementShowSeen = false;
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
            handleSwitchChange (value) {
                console.log('handleSwitchChange: ', value);
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
                this.currentIndex = undefined;
                this.draggedList.splice(index, 1);
            },
            handleDropDownClick (name) {
                if (name === 'show') {
                    this.elementShowSeen = true;
                } else if (name === 'create') {
                    this.elementCreateSeen = true;
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
            },
            handleCopyCode () {
                console.log(this.codeMirror.getValue());
                this.$Message.success('复制成功');
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
            listString: {
                get () {
                    return JSON.stringify(this.currentElement, null, 2);
                },
                set () {

                }
            },
            codeMirror () {
                return this.$refs.CodeMirror.codemirror;
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
    .mq-code-mirror .CodeMirror {
        border: 1px solid #eee;
        height: auto;
    }
</style>
<style lang="less" scoped>
    .flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .list-group-container {
        height: 585px;
        max-height: 800px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .list-group {
        min-height: 585px;
        padding: 10px;
    }
    .list-group-item {
        cursor: move;
        position: relative;
        margin-bottom: 1px;
        i {
            cursor: pointer;
        }
        .ivu-form-item-label {
            cursor: move;
        }
    }
    .active {
        position: relative;
        outline: 2px dashed #57a3f3;
        .active-absolute {
            position: absolute;
            width: 100%;
            right: -2px;
            bottom: 23px;
            &-close {
                z-index: 10;
                position: absolute;
                background: #57a3f3;
                height: 25px;
                width: 25px;
                right: 0px;
                top: 0px;
                text-align: center;
                line-height: 25px;
                .md-close {
                    font-size: 14px;
                    color: #fff;
                }
            }
        }
    }
</style>
