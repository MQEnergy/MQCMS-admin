<template>
    <div class="upload-form">
        <Tabs :animated="false" type="card" @on-click="handleTabClick">
            <TabPane name="local" v-if="isLocal" label="本地图片">
                <div v-if="showBaseUpload">
                    <Upload
                            type="drag"
                            ref="upload"
                            :multiple="multiple"
                            :show-upload-list="true"
                            :before-upload="handleBeforeUpload"
                            :headers="setHeader"
                            :on-success="handleUploadSuccess"
                            :on-error="handleUploadError"
                            :on-preview="handlePreviewImage"
                            :action="uploadUrl">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或拖拽文件上传</p>
                        </div>
                    </Upload>
                    <div v-for="(item, index) in uploadedFileList" :key="index" style="clear: both">
                        上传的图片: {{ item.fileName }}
                        <Button style="float: right; color: #1e93ff" type="text" @click="handleUpload(index)" :loading="item.loadingStatus">
                            {{ item.loadingStatus ? '上传中' : '点击上传' }}
                        </Button>
                    </div>
                </div>
                <div v-else>
                    <slot name="upload"></slot>
                </div>
            </TabPane>
            <TabPane name="stock" v-if="isStock" label="图库图片">
                <Row :loading="loading">
                    <Col span="15">
                        <div class="upload-form-left-container">
                            <!-- 搜索 -->
                            <search-form
                                    class="upload-form-left-container-container-search-form"
                                    :show-refresh="false"
                                    :show-create="false"
                                    :show-advanced="false"
                                    ref="searchForm"
                                    :base-search-form="baseSearchForm"
                                    @on-search="handleSearchImageList"
                                    @on-reset="handleImageList"
                            />
                            <div class="upload-form-left-container-spin" v-if="loading">
                                <Spin fix size="large"></Spin>
                            </div>
                            <empty :is-back="false" v-else-if="imageList.length === 0" />
                            <div class="upload-form-left-container-container" v-else>
                                <div class="upload-form-left-container-container-img-list">
                                    <div class="upload-form-left-container-container-img-item" v-for="(item, index) in imageList" :key="index" @click="handleSelectStoreImg(index)">
                                        <img v-if="item.attach_type === 1" :src="item.attach_full_url" >
                                        <video v-if="item.attach_type === 2">
                                            <source :src="item.attach_full_url" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                        <div class="upload-form-left-container-container-border" v-if="item.isChoose">
                                        </div>
                                    </div>
                                </div>
                                <div class="upload-form-left-container-container-pagination">
                                    <Page :total="imgTotal" show-total :current.sync="currentPage" :page-size="imgSize" @on-change="handleChange"/>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col v-if="currentItem" span="9">
                        <div class="upload-form-right-container">
                            <p class="upload-form-right-container-title">附件详情</p>
                            <div class="upload-form-right-container-resource">
                                <img @click="handlePreviewRightImage" v-if="currentItem.attach_type === 1" :src="currentItem.attach_full_url" >
                                <video @click="handlePreviewRightImage" v-if="currentItem.attach_type === 2" muted autoplay>
                                    <source :src="currentItem.attach_full_url" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div class="upload-form-right-container-resource-info">
                                <Form :model="currentItem" :label-width="58" label-position="left">
                                    <FormItem label="原名称:">{{ currentItem.attach_origin_name }}</FormItem>
                                    <FormItem label="新名称:">{{ currentItem.attach_name }}.{{ currentItem.attach_extension }}</FormItem>
                                    <FormItem label="格式:">{{ currentItem.attach_minetype }}</FormItem>
                                    <FormItem label="大小:">
                                        {{ parseFloat(currentItem.attach_size / 1000).toFixed(2) > 1024
                                        ? parseFloat(currentItem.attach_size / 1000 / 1000).toFixed(2) + 'MB' :
                                        parseFloat(currentItem.attach_size / 1000).toFixed(2) + 'KB' }}
                                    </FormItem>
                                    <FormItem label="时间:">{{ currentItem.created_at }}</FormItem>
                                </Form>
                                <p class="upload-form-right-container-resource-del-button">
                                    <Poptip
                                            confirm
                                            title="您确认删除这张图片吗？"
                                            @on-ok="handleDelSubmit"
                                            @on-cancel="handleDelCancel">
                                        <Button type="error" ghost size="small">永久删除</Button>
                                    </Poptip>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col v-else span="8">
                        <empty :is-back="false" empty-text="请选择左边的图片展示图片信息"/>
                    </Col>
                </Row>
            </TabPane>
            <TabPane name="net" v-if="isNet" label="网络图片">
                <Input v-model="netPicUrl" placeholder="请输入网络图片地址">
                    <span slot="prepend">网络图片</span>
                </Input>
                <p style="margin: 10px 0px">图片地址必须以http开头,以jpg,png,bmp,gif结束</p>
            </TabPane>
        </Tabs>
        <Modal title="预览图片" v-model="imgVisible" width="830">
            <div v-if="currentItem" style="text-align: center">
                <img v-if="currentItem.attach_type === 1" :src="currentItem.attach_full_url" style="max-width: 800px; max-height: 800px;" >
                <video v-if="currentItem.attach_type === 2" muted autoplay>
                    <source :src="currentItem.attach_full_url" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div slot="footer">
                <Button type="error" @click="handleCloseModal">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import SearchForm from '@/components/searchform';
    import request from '@/plugins/request';
    import util from '@/libs/util';
    import Empty from '@/components/common/empty';
    import mixinApp from "@/mixins/app";
    export default {
        mixins: [ mixinApp ],
        name: 'upload-form',
        components: {
            Empty,
            SearchForm
        },
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            uploadUrl: {
                type: String,
                default: '/admin/attachment/upload'
            },
            imageListUrl: {
                type: String,
                default: '/attachment/index'
            },
            delImageUrl: {
                type: String,
                default: '/attachment/delete'
            },
            isLocal: {
                type: Boolean,
                default: true
            },
            isStock: {
                type: Boolean,
                default: true
            },
            isNet: {
                type: Boolean,
                default: true
            },
            isDel: {
                type: Boolean,
                default: true
            },
            showBaseUpload: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                file: null,
                uploadedFileList: [],
                imgList: [],
                currentItem: undefined,
                netPicUrl: '',
                currentPage: 1,
                imgTotal: 0,
                imgSize: 20,
                imgVisible: false,
                currentVisibleImg: '',
                loading: true,
                searchForm: {},
                baseSearchForm: {
                    type: 'id',
                    keyword: '',
                    options: [
                        {
                            name: 'ID',
                            value: 'id'
                        },
                        {
                            name: '附件名称',
                            value: 'attach_name'
                        },
                        {
                            name: '附件原名称',
                            value: 'attach_origin_name'
                        }
                    ]
                },
            }
        },
        computed: {
            setHeader () {
                const token = util.cookies.get('token');
                if (token) {
                    return {
                        Authorization: 'Bearer ' + token
                    }
                }
            },
            imageList () {
                this.imgList.forEach((item, index) => {
                    item.isChoose = false;
                });
                return this.imgList;
            }
        },
        mounted() {
            if (this.imageListUrl !== '') {
                this.handleImageList();
            }
        },
        methods: {
            handleImageList () {
                this.loading = true;
                return request({
                    url: this.imageListUrl,
                    method: 'get',
                    params: {
                        page: this.currentPage,
                        limit: this.imgSize
                    }
                }).then(async res => {
                    this.imgList = res.data;
                    this.imgTotal = res.total;
                }).finally(() => {
                    this.loading = false;
                });
            },
            handleSearchImageList (searchForm) {
                if (searchForm._is_search) {
                    this.currentPage = 1;
                }
                this.list = [];
                this.searchForm = searchForm;
                this.loading = true;
                return request({
                    url: this.imageListUrl,
                    method: 'post',
                    data: {
                        page: this.currentPage,
                        limit: this.imgSize,
                        search: searchForm
                    }
                }).then(async res => {
                    this.imgList = res.data;
                    this.imgTotal = res.total;
                }).finally(() => {
                    this.loading = false;
                });
            },
            handleBeforeUpload (file) {
                this.uploadedFileList.push({
                    loadingStatus: false,
                    fileOrigin: file,
                    fileName: file.name
                });
                return false;
            },
            handleUpload (index) {
                this.uploadedFileList[index].loadingStatus = true;
                new Promise((resolve, reject) => {
                    this.$refs.upload.post(this.uploadedFileList[index].fileOrigin);
                    resolve();
                }).then(res => {
                    this.uploadedFileList[index].loadingStatus = false;
                    this.uploadedFileList.splice(index, 1);
                });
            },
            handleUploadSuccess (res, file, uploadedFileList) {
                this.$Message.success('上传成功');
                console.info('file: ', file, 'uploadedFileList: ', uploadedFileList)
            },
            handleUploadError (err, response, file) {
                this.$Message.error(response.message);
            },
            handleSelectStoreImg (index) {
                this.currentItem = undefined;
                this.currentItem = this.imgList[index];
                this.imgList[index].isChoose = true;
                this.imgList.forEach((val, key) => {
                    if (key !== index) {
                        val.isChoose = false;
                    }
                })
            },
            handleDelSubmit () {
                return request({
                    url: this.delImageUrl,
                    method: 'post',
                    data: {
                        id: this.currentItem.id
                    }
                }).then(res => {
                    this.$Message.success('删除成功');
                    this.currentPage = 1;
                    this.currentItem = undefined;
                    this.handleImageList();
                });
            },
            handleDelCancel () {
            },
            handleChange (page) {
                this.currentPage = page;
                if (this.searchForm) {
                    this.handleSearchImageList(this.searchForm);
                } else {
                    this.handleImageList();
                }
            },
            handleTabClick (name) {
                if (name === 'stock') {
                    this.currentPage = 1;
                    this.handleImageList();
                }
            },
            handlePreviewImage (file) {
                this.imgVisible = true;
                this.currentItem = file.response;
            },
            handlePreviewRightImage () {
                this.imgVisible = true;
                this.currentVisibleImg = this.currentItem.attach_full_url;
            },
            handleCloseModal () {
                this.imgVisible = false;
            }
        }
    }
</script>
<style lang="less">
    .upload-form .search-form-base-row-input {
        max-width: none !important;
    }
</style>
<style lang="less" scoped>
    .upload-form {
        .ivu-form-item {
            margin-bottom: 0px;
        }
        &-left-container {
            border-right: 1px solid #eee;
            &-spin {
                position: relative;
                height: 200px;
            }
            &-container {
                &-search-form {
                    border-bottom: 1px solid #eee;
                    margin-bottom: 20px;
                    margin-right: 25px;
                }
                &-img-list {
                    position: relative;
                    margin-bottom: 20px;
                }
                &-img-item {
                    position: relative;
                    margin: 6px;
                    width: 80px;
                    height: 80px;
                    display: inline-block;
                    img, video {
                        width: 80px;
                        height: 80px;
                        cursor: pointer
                    }
                }
                &-border {
                    position: absolute;
                    height: 82px;
                    width: 82px;
                    top: -1px;
                    left: -1px;
                    border: 2px solid #409EFF;
                }
                &-pagination {
                    margin: 0px auto;
                    text-align: center
                }
            }
        }
        &-right-container {
            padding-left: 15px;
            &-title {
                font-weight: bold;
                border-bottom: 1px solid #ebeef5;
                padding-bottom: 10px;
                margin-bottom: 15px;
            }
            &-resource {
                text-align: center;
                img, video {
                    cursor: pointer;
                    height: 120px;
                    width: 120px;
                }
                &-info {
                    line-height: 25px;
                    word-wrap:break-word;
                    word-break:break-all;
                }
                &-del-button {
                    margin-top: 10px;
                }
            }
        }
    }

</style>
