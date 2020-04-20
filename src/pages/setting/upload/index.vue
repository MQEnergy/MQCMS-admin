<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="上传设置" content="" hidden-breadcrumb />
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Form ref="create" :model="createData" label-position="top" v-width="600">
                <FormItem label="最大同时上传文件数：" prop="website_name">
                    <Input v-model="createData.user_name" placeholder="最大同时上传文件数" />
                    <p>多文件上传时,用户能最大同时上传文件数,默认20个</p>
                </FormItem>
                <FormItem label="文件分块上传分块大小：" prop="website_name">
                    <Input v-model="createData.user_name" placeholder="文件分块上传分块大小" />
                    <p>文件上传采用分块上传,文件分块大小默认512KB,可以根据服务器最大上传限制设置此数值</p>
                </FormItem>
                <FormItem label="图片文件：" prop="site_email">
                    <Input v-model="createData.site_email" placeholder="请输入SEO关键字" />
                    <Input v-model="createData.current_tag" placeholder="请输入标签点击enter新建" @keyup.enter.native="handleTagAdd" />
                    <Tag @on-close="handleCloseTag" v-for="item in createData.relation_tags_list" :key="item" :name="item" type="border" color="primary" closable>{{ item }}</Tag>
                    <p>许上传大小默认为10240KB,1M=1024KB，允许上传格式默认为jpg,jpeg,png,gif,bmp</p>
                </FormItem>
                <FormItem label="视频文件：" prop="site_email">
                    <Input v-model="createData.site_email" placeholder="请输入SEO关键字" />
                    <Input v-model="createData.current_tag" placeholder="请输入标签点击enter新建" @keyup.enter.native="handleTagAdd" />
                    <Tag @on-close="handleCloseTag" v-for="item in createData.relation_tags_list" :key="item" :name="item" type="border" color="primary" closable>{{ item }}</Tag>
                    <p>允许上传大小默认为102400KB,1M=1024KB，允许上传格式默认为mp4,avi,wmv,rm,rmvb,mkv</p>
                </FormItem>
                <FormItem label="音频文件：" prop="site_email">
                    <Input v-model="createData.site_email" placeholder="请输入SEO关键字" />
                    <Input v-model="createData.current_tag" placeholder="请输入标签点击enter新建" @keyup.enter.native="handleTagAdd" />
                    <Tag @on-close="handleCloseTag" v-for="item in createData.relation_tags_list" :key="item" :name="item" type="border" color="primary" closable>{{ item }}</Tag>
                    <p>允许上传大小默认为10240KB,1M=1024KB，允许上传格式默认为mp3,wma,wav</p>
                </FormItem>
                <FormItem label="附件：" prop="site_email">
                    <Input type="textarea" v-model="createData.site_email" placeholder="请输入SEO描述" />
                    <Input v-model="createData.current_tag" placeholder="请输入标签点击enter新建" @keyup.enter.native="handleTagAdd" />
                    <Tag @on-close="handleCloseTag" v-for="item in createData.relation_tags_list" :key="item" :name="item" type="border" color="primary" closable>{{ item }}</Tag>
                    <p>允许上传大小默认为10240KB,1M=1024KB，允许上传格式默认为除以上文档类型以外的其它常用文件,如：txt,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar</p>
                </FormItem>
                <FormItem>
                    <Button type="primary">保存</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
    export default {
        name: 'setting-site',
        components: {
        },
        data () {
            return {
                createData: {
                    current_tag: '',
                    relation_tags_list: []
                }
            }
        },
        methods: {
            handleTagAdd () {
                const index = this.createData.relation_tags_list.indexOf(this.createData.current_tag);
                if (index >= 0) {
                    this.$Message.error('标签已存在');
                    return false;
                }
                this.createData.relation_tags_list.push(this.createData.current_tag);
                console.log(this.createData)
            },
            handleCloseTag (event, name) {
                const index = this.createData.relation_tags_list.indexOf(name);
                this.createData.relation_tags_list.splice(index, 1);
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
