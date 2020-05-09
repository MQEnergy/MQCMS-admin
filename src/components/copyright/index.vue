<template>
    <global-footer class="i-copyright" :links="links" :copy-right="copyright" />
</template>
<script>
    import globalFooter from "@/components/copyright/globalFooter";
    export default {
        name: 'i-copyright',
        components: {
            globalFooter
        },
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
