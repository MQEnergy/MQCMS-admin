<template>
    <div class="icon-container">
        <Tabs v-model="currentTab" type="card" :animated="false">
            <TabPane label="自定义" name="custom">
                <Row :gutter="10">
                    <Col :span="4" v-for="(item, index) in customIconList" :key="index">
                        <div class="icon-cell" @click="handleChooseIcon(item, index)" >
                            <div :class="item.is_active ? 'active' : ''"></div>
                            <Icon v-if="!item.is_custom" :type="item.font_class" size="30" />
                            <Icon v-else :class="fontFamily" :custom="cssPrefixText + item.font_class" size="30" />
                            <p>{{ item.name }}</p>
                        </div>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="系统自带" name="system">
                <Row :gutter="10">
                    <Col :span="4" v-for="(item, index) in sysIconList" :key="index">
                        <div class="icon-cell" @click="handleChooseIcon(item, index)">
                            <div :class="item.is_active ? 'active' : ''"></div>
                            <Icon v-if="!item.is_custom" :type="item.font_class" size="30" />
                            <Icon v-else :class="fontFamily" :custom="cssPrefixText + item.font_class" size="30" />
                            <p>{{ item.name }}</p>
                        </div>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import data from './data';

    export default {
        name: "icon-index",
        data () {
            return {
                sysIconList: data.sysIconList,
                customIconList: data.customIcon.glyphs,
                fontFamily: data.customIcon.font_family,
                cssPrefixText: data.customIcon.css_prefix_text,
                currentTab: 'custom'
            }
        },
        methods: {
            handleChooseIcon (item, index) {
                let list = this.sysIconList;
                if (this.currentTab === 'custom') {
                    list = this.customIconList;
                }
                item.is_active = true;
                list.forEach((value, key) => {
                    if (index !== key) {
                        value.is_active = false;
                    }
                });
                this.$emit('on-choose-icon', item, index);
            },
        }
    }
</script>

<style lang="less" scoped>
    .icon-container {
        height: 500px;
        overflow-y: scroll;
        .icon-cell {
            text-align: center;
            height: 100px;
            padding-top: 20px;
            cursor: pointer;
            position: relative;
            p {
                margin-top: 10px;
            }
        }
        .active {
            border: 2px solid #409EFF;
            position: absolute;
            height: 100px;
            width: 100%;
            top: 0px;
            left: 0px;
        }
    }
</style>