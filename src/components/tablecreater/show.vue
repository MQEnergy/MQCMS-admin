<template>
    <div>
        <div v-for="(element, index) in draggedList" :key="element.ele_hash" >
            <template v-if="element.ele_name === 'search'">
                <component-search
                        :element="element"
                        :index="index"
                        :form-config="formConfig"
                        @on-create-form="handleOpenUpdateCreate"
                />
            </template>
            <template v-if="element.ele_name === 'table'">
                <component-table :element="element" :index="index" :form-config="formConfig" />
            </template>
        </div>
    </div>
</template>

<script>
    import elements from './data';
    import ComponentSearch from "./components/search";
    import ComponentTable from "./components/table";

    export default {
        name: "table-show",
        components: {
            ComponentTable,
            ComponentSearch
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
            // 编辑创建数据
            handleOpenUpdateCreate (status, updateIndex) {
                this.$refs.createForm.handleShowUpdateCreate(status, updateIndex);
            },
        }
    }
</script>

<style scoped>

</style>