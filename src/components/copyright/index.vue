<template>
    <GlobalFooter class="i-copyright" :links="links" :copyright="copyright" />
</template>
<script>
    export default {
        name: 'i-copyright',
        data () {
            return {
                links: [
                    {
                        title: '官网',
                        key: '官网',
                        href: 'https://www.mqcms.net',
                        blankTarget: true
                    },
                    {
                        title: '社区',
                        key: '社区',
                        href: 'https://community.mqcms.net',
                        blankTarget: true
                    }
                ],
                copyright: 'Copyright © 2019 mqcms'
            }
        }
    }
</script>
<style lang="less">
    .i-copyright{
        flex: 0 0 auto;
    }
</style>
