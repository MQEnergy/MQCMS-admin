export default {
    data () {
        return {
            tabList: [
                {
                    label: '组件',
                    name: 'components'
                },
                {
                    label: '应用',
                    name: 'apps'
                }
            ]
        }
    },
    methods: {
        handleChangeTab ({ name }) {
            this.$emit('on-tab', name);
        }
    }
}
