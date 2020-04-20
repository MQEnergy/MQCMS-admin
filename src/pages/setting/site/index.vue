<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="站点设置" content="" hidden-breadcrumb />
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Tabs :animated="false">
                <TabPane label="网站信息">
                    <site-website :create-data="createData" @on-show="handleShow" />
                </TabPane>
                <TabPane label="SEO设置">
                    <site-seo :create-data="createData" @on-show="handleShow"  />
                </TabPane>
                <TabPane label="CDN设置">
                    <site-cdn :create-data="createData" @on-show="handleShow"  />
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>
<script>
    import SiteWebsite from "./components/website";
    import SiteSeo from "@/pages/setting/site/components/seo";
    import SiteCdn from "@/pages/setting/site/components/cdn";
    import {SiteConfigShow} from "@api/siteconfig";

    export default {
        name: 'setting-site',
        components: {
            SiteCdn,
            SiteSeo,
            SiteWebsite
        },
        data () {
            return {
                id: '',
                createData: {
                    id: '',
                    site_name: '',
                    theme_id: '',
                    icp_no: '',
                    safe_record: '',
                    site_email: '',
                    site_analytics: '',
                    seo_title: '',
                    seo_keyword: '',
                    seo_description: '',
                    cdn_url: '',
                },
            }
        },
        mounted() {
            this.handleShow();
        },
        methods: {
            handleShow (id='') {
                SiteConfigShow({
                    id: id
                }).then(res => {
                    this.createData = Object.assign(this.createData, res)
                })
            },
        }
    }
</script>
<style lang="less" scoped>

</style>
