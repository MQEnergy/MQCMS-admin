<template>
    <div>
        <Modal width="880" :mask-closable="false" v-model="showCreate" title="菜单管理" footer-hide>
            <Tabs type="card">
                <TabPane label="导航菜单" name="navlist">
                    <item-list />
                </TabPane>
                <TabPane label="添加菜单" name="addnav">
                    <create-item-form ref="createItemForm" @on-show="handleSelectIconShow" />
                </TabPane>
            </Tabs>
        </Modal>
        <!-- icon选择 -->
        <Modal
                v-model="iconSeen"
                title="选择icon"
                width="800"
                :styles="{ top: '40px' }"
                :mask-closable="false"
                @on-ok="handleModalOk"
                @on-cancel="handleModalCancel">
            <icon-index @on-choose-icon="handleChooseIcon" />
        </Modal>
    </div>
</template>

<script>
    import ItemList from "./item-list";
    import CreateItemForm from "./create-item-form";
    import IconIndex from "@/components/icon/index";

    export default {
        name: 'nav-item-form',
        components: {CreateItemForm, ItemList, IconIndex},
        data () {
            return {
                showCreate: false,
                iconSeen: false,
                iconInfo: {},
            }
        },
        methods: {
            handleItemCreate (status) {
                this.showCreate = status;
                this.handleItemList();
            },
            handleItemList () {

            },
           handleSelectIconShow () {
                this.iconSeen = true;
            },
            handleModalOk () {
                const currentIcon = this.iconInfo;
                this.$refs.createItemForm.handleIconShow(currentIcon);
            },
            handleModalCancel () {
                this.iconSeen = false;
            },
            handleChooseIcon (item, index) {
                this.iconInfo = item;
            },
        }
    }
</script>
<style scoped>
</style>
