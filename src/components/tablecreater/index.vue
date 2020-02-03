<template>
    <div class="ivu-pt-16">
        <Row :gutter="16">
            <Col :xl="16" :lg="16" :md="24" :sm="24" :xs="24">
                <Row>
                    <Col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" class="ivu-mb">
                        <Card :bordered="false" dis-hover>
                            <div slot="title">基础组件</div>
                            <div class="list-group-left-top-container">
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
                    <Col :span="24">
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
                            <div class="list-group-left-bottom-container">
                                <Row :gutter="10">
                                    <Col :span="24" v-if="draggedList.length === 0">
                                        <div v-if="!isDragging" style="height: 20px; text-align: center; color: #999">
                                            <empty empty-text="请将上面组件拖入到可视区域" :is-back="false" />
                                        </div>
                                    </Col>
                                    <draggable element="div" v-model="draggedList" v-bind="dragOptionsRight">
                                        <transition-group class="list-group" tag="div">
                                            <Col class="list-group-item" :span="24" v-for="(element, index) in draggedList" :key="element.ele_hash" :class="[element.is_active ? 'active' : '']">
                                                <div v-if="element.is_active" class="active-absolute">
                                                    <div @click="handleFormItemClose(element, index)" class="active-absolute-close">
                                                        <Icon class="md-close" type="md-close" />
                                                    </div>
                                                </div>
                                                <div @click="handleFormItemClick(element, index)" >
                                                    <template v-if="element.ele_name === 'search'">
                                                        <component-search
                                                                :element="element"
                                                                :index="index"
                                                                :form-config="formConfig"
                                                                @on-create-form="handleOpenUpdateCreate"
                                                        />
                                                    </template>
                                                    <!-- slot额外table_item表单 -->
                                                    <slot name="table-item"></slot>

                                                    <template v-if="element.ele_name === 'table'">
                                                        <component-table :element="element" :index="index" :form-config="formConfig" />
                                                    </template>
                                                </div>
                                            </Col>
                                        </transition-group>
                                    </draggable>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
                <Card :bordered="false" dis-hover>
                    <div slot="title">属性设置</div>
                    <div class="list-group-container" style="overflow-y: hidden">
                        <Tabs type="card">
                            <TabPane label="字段属性">
                                <div style="height: 535px; overflow-y: scroll">
                                    <empty v-if="currentElement === undefined" empty-text="请选择左边可视区域中的元素" :is-back="false" />
                                    <table-attribute @on-element-size="handleElementSize" :current-element="currentElement" :form-config="formConfig" />
                                </div>
                            </TabPane>
                            <TabPane label="表格属性">
                                <Form
                                    :model="formConfig"
                                    label-position="top"
                                >
                                    <FormItem label="组件尺寸">
                                        <RadioGroup v-model="formConfig.table.size" @on-change="handleElementSize(2)" type="button">
                                            <Radio label="default">default</Radio>
                                            <Radio label="small">small</Radio>
                                            <Radio label="large">large</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem label="自定义表单class">
                                        <Input v-model="formConfig.table.custom_class" placeholder="请输入class属性" />
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
    import 'codemirror/mode/javascript/javascript';

    import Draggable from "vuedraggable";
    import random_str from "@/libs/random_str";
    import Empty from '@/components/common/empty';
    import elements from './data';
    import Show from './show';
    import Attribute from './attribute';
    import ComponentSearch from "./components/search";
    import ComponentTable from "./components/table";
    import TableAttribute from "@/components/tablecreater/attribute";

    export default {
        name: 'table-creater',
        components: {
            TableAttribute,
            ComponentTable,
            ComponentSearch,
            Draggable,
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
                    lineNumbers: true,
                    line: true,
                }
            }
        },
        methods: {
            onMove({ relatedContext, draggedContext }) {
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
                console.log(this.currentElement);
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
                    this.formConfig.table.size_active = false;
                } else {
                    this.formConfig.table.size_active = true;
                    this.draggedList.forEach((item, index) => {
                        item.ele_size = this.formConfig.table.size;
                    });
                }
            },
            handleCopyCode () {
                console.log(this.codeMirror.getValue());
                this.$Message.success('复制成功');
            },
            // 编辑创建数据
            handleOpenUpdateCreate (status, updateIndex) {
                console.log('handleOpenUpdateCreate');
                // this.$refs.createForm.handleShowUpdateCreate(status, updateIndex);
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
    .list-group-left-top-container {
        height: 35px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .list-group-left-bottom-container {
        height: 458px;
        overflow-y: scroll;
        overflow-x: hidden;
        .list-group {
            min-height: 458px;
            padding: 10px;
        }
    }
    .list-group-container {
        height: 585px;
        max-height: 800px;
        overflow-y: scroll;
        overflow-x: hidden;
        .list-group {
            min-height: 585px;
            padding: 10px;
        }
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
