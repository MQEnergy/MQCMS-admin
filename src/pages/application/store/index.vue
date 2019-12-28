<template>
    <div>
        <components-template ref="components" @on-tab="setTabActiveKey" v-if="tabActiveKey === 'components'" />
        <apps-template ref="apps" @on-tab="setTabActiveKey" v-if="tabActiveKey === 'apps'" />
    </div>
</template>
<script>
    import componentsTemplate from './components/index';
    import appsTemplate from './apps/index';
    import mixin from './mixins';

    export default {
        name: 'application-store-index',
        mixins: [ mixin ],
        components: {
            componentsTemplate,
            appsTemplate
        },
        data () {
            return {
                tabActiveKey: 'components'
            }
        },
        methods: {
            setTabActiveKey (val) {
                this.tabActiveKey = val;
            }
        }
    }
</script>
