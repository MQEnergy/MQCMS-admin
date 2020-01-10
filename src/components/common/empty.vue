<template>
    <div class="empty-container">
        <p v-if="isIcon"><Icon class="empty-container-icon" :class="styleClass" :type="icon" /></p>
        <p v-else><img class="empty-container-img" :class="styleClass" :src="icon" /></p>
        <p class="empty-container-text"><span>{{ emptyText }}</span></p>
        <p class="empty-container-btn"><Button v-if="isBack" @click="handleBack" shape="circle" type="dashed">返回</Button></p>
    </div>
</template>

<script>
    export default {
        name: "empty-list",
        props: {
            emptyText: {
                type: String,
                default: '暂无列表'
            },
            isIcon: {
                type: Boolean,
                default: true
            },
            icon: {
                type: String,
                default: 'ios-cube',
            },
            styleClass: {
                type: String,
                default: ''
            },
            isBack: {
                type: Boolean,
                default: true
            },
        },
        data () {
            return {
            
            }
        },
        methods: {
            handleBack () {
                history.back();
            }
        }
    }
</script>

<style lang="less" scoped>
    .empty-container {
        height: 200px;
        padding-top: 20px;
        text-align: center;
        line-height: 35px;
        &-icon {
            font-size: 70px;
            color: #eee;
        }
        &-text {
            color: #999;
        }
        &-btn {
            margin-top: 15px;
        }
    }
</style>
