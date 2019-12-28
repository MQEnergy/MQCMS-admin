export default {
    data () {
        return {
            tabList: [
                {
                    label: '文章',
                    name: 'article'
                },
                {
                    label: '项目',
                    name: 'projects'
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
            if (name !== this.tabActiveKey) this.$router.push(`/search/search-${name}`);
        }
    }
}
