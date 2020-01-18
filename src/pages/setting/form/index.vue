<template>
    <div class="ivu-pt-16">
        <Row :gutter="24">
            <Col :xl="6" :lg="6" :md="24" :sm="24" :xs="24" class="ivu-mb">
                <Card :bordered="false" dis-hover>
                    <p style="margin-bottom: 10px;">基础组件</p>
                    <div style="height: 500px; max-height: 800px;">
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
                    <p style="margin-bottom: 10px;">可视化内容</p>
                    <div style="height: 500px; max-height: 800px;">
                        <Row :gutter="10">
                            <Form :model="formItem" :label-width="labelWidth" >
                                <draggable element="span" v-model="draggedList" v-bind="dragOptionsRight">
                                     <transition-group class="list-group" tag="div">
                                         <Col class="list-group-item" :span="24" v-for="element in draggedList" :key="element.ele_hash">
                                             <FormItem :label="element.ele_title" :prop="element.ele_prop">
                                                 <template v-if="element.ele_name === 'input'">
                                                     <Input :type="element.ele_type" v-model="element.ele_value" :element-id="element.ele_hash" :placeholder="element.placeholder" />
                                                 </template>
                                                 <template v-if="element.ele_name === 'radio_group'">
                                                     <RadioGroup v-if="element.ele_type" v-model="element.ele_value" :type="element.ele_type">
                                                         <Radio v-for="(option, index) in element.options" :key="index" :label="option.label">{{ option.name }}</Radio>
                                                     </RadioGroup>
                                                     <RadioGroup v-else v-model="element.ele_value" >
                                                         <Radio v-for="(option, index) in element.options" :key="index" :label="option.label">{{ option.name }}</Radio>
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
                                                             :type="element.ele_type"
                                                             :format="element.format"
                                                             :options="element.options"
                                                             :placeholder="element.placeholder">
                                                     </DatePicker>
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
            <Col :xl="8" :lg="8" :md="24" :sm="24" :xs="24" class="ivu-mb">
                <Card :bordered="false" dis-hover>
                    <p>属性设置</p>
                    <div style="height: 500px; max-height: 800px; overflow-y: scroll">
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
    import elements from './data';
    export default {
        name: 'setting-form',
        components: {
            draggable
        },
        data () {
            return {
                componentsList: elements,
                draggedList: [],
                editable: true,
                isDragging: false,
                delayedDragging: false,
                formItem: {},
                currentIndex: 0,
                labelWidth: 80
            }
        },
        methods: {
            onMove({ relatedContext, draggedContext }) {
                const relatedElement = relatedContext.element;
                const draggedElement = draggedContext.element;
                const draggedIndex = draggedContext.index;
                this.currentIndex = draggedIndex ? draggedIndex : 0;
                return true;
            },
            onStart (value) {
                this.isDragging = true;
                // const componentsList = JSON.parse(JSON.stringify(this.componentsList));
                // componentsList[value.oldIndex].ele_hash = 'mq-' + value.timeStamp + '-' + value.oldIndex;
                // this.componentsList = componentsList;
            },
            onClone (value) {
            },
            onEnd (value) {
                this.isDragging = false;
                const draggedList = JSON.parse(JSON.stringify(this.draggedList));
                for (let i = 0; i < draggedList.length; i++) {
                    // draggedList[i].ele_hash = 'mq-' + new Date().getTime() + '-' + i;
                    draggedList[i].ele_hash = 'mq-' + random_str();
                }
                this.draggedList = draggedList;
            },
        },
        computed: {
            dragOptionsLeft () {
                return {
                    group: {
                        name: 'shared',
                        pull: 'clone',
                        put: false // Do not allow items to be put into this list
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
        min-height: 500px;
    }
    .list-group-item {
        cursor: move;
    }
    .list-group-item i {
        cursor: pointer;
    }
</style>
