<template>
    <div class="icon-container">
        <div class="icon-search ivu-mt-8 ivu-mb">
            <Input v-model="keyword" @input="handleSearchIcon" size="large" placeholder="输入英文关键词搜索 如：logo" clearable />
        </div>
        <Tabs v-model="currentTab" type="card" :animated="false" @on-click="handleTabClick">
            <TabPane label="系统" name="system"></TabPane>
            <TabPane label="自定义" name="custom" v-if="isCustom"></TabPane>
        </Tabs>
        <div class="icon-list">
            <Row :gutter="10">
                <Col :span="4" v-for="(item, index) in iconList" :key="index">
                    <div class="icon-cell" @click="handleChooseIcon(item, index)" >
                        <div :class="item.is_active ? 'active' : ''"></div>
                        <Icon v-if="!item.is_custom" :type="item.font_class" size="30" />
                        <Icon v-else :class="fontFamily" :custom="cssPrefixText + item.font_class" size="30" />
                        <p>{{ item.name }}</p>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import data from './data';

    export default {
        name: "icon-index",
        props: {
            isCustom: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                iconList: data.sysIconList,
                fontFamily: data.customIcon.font_family,
                cssPrefixText: data.customIcon.css_prefix_text,
                currentTab: 'system',
                keyword: ''
            }
        },
        methods: {
            handleChooseIcon (item, index) {
                item.is_active = true;
                this.iconList.forEach((value, key) => {
                    if (index !== key) {
                        value.is_active = false;
                    }
                });
                item.is_custom = this.currentTab !== 'system';
                this.$emit('on-choose-icon', item, index);
            },
            handleSearchIcon () {
                let list = this.currentTab === 'system' ? data.sysIconList : data.customIcon.glyphs;
                list = list.filter(item => {
                    return item.name.indexOf(this.keyword) >= 0;
                });
                this.iconList = list;
            },
            handleTabClick (name) {
                if (name === 'system') {
                    this.iconList = data.sysIconList;
                } else {
                    this.iconList = data.customIcon.glyphs;
                }
                this.handleSearchIcon();
            }
        }
    }
</script>

<style lang="less" scoped>
    .icon-container {
        height: 520px;
        .icon-search {
            max-width: 500px;
            margin: 0px auto;
        }
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
        .icon-list {
            height: 420px;
            overflow-y: scroll;
            overflow-x: hidden;
        }
    }

</style>
<style lang="less">
    .icon-container {
        .ivu-input {
            width: 500px;
            box-sizing: border-box;
            border: 0;
            background: #f5f5f5;
            text-align: center;
            outline: none;
            margin: 0 auto;
        }
        .ivu-input:focus, .ivu-input:hover, .ivu-input:active {
            border-color: #f5f5f5;
            outline: 0;
            box-shadow: none;
        }
        .ivu-input::-webkit-input-placeholder {
            color: #999;
        }

        .ivu-input:-moz-placeholder {
            color: #999;
        }

        .ivu-input::-moz-placeholder {
            color: #999;
        }

        .ivu-input:-ms-input-placeholder {
            color: #999;
        }
    }
</style>