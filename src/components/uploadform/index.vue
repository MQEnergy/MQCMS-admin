<template>
    <div>
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
                    <Col span="16">
                        <div style="position: relative;height: 100px;" v-if="loading">
                            <Spin fix size="large"></Spin>
                        </div>
                        <empty v-else-if="imageList.length === 0" />
                        <div v-else>
                            <div style="position: relative; margin-bottom: 20px;">
                                <div v-for="(item, index) in imageList" :key="index" @click="handleSelectStoreImg(index)" style="position: relative; margin: 6px; width: 80px; height: 80px; display: inline-block; ">
                                    <img v-if="item.attach_type === 1" :src="item.attach_url" style="width: 80px; height: 80px; cursor: pointer">
                                    <video v-if="item.attach_type === 2" width="80" height="80">
                                        <source :src="item.attach_url" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video>
                                    <div v-if="item.isChoose" style="position: absolute; height: 82px; width: 82px; top: -1px; left: -1px; border: 2px solid #409EFF;">
                                    </div>
                                </div>
                            </div>
                            <div style="margin: 0px auto; text-align: center">
                                <Page :total="imgTotal" show-total :current.sync="currentPage" :page-size="imgSize" @on-change="handleChange"/>
                            </div>
                        </div>
                    </Col>
                    <Col v-if="currentItem" span="8">
                        <div class="upload-form-right-container">
                            <p class="upload-form-right-container-title" style="">附件详情</p>
                            <img @click="handlePreviewRightImage" v-if="currentItem.attach_type === 1" class="upload-form-right-container-resource" :src="currentItem.attach_url" >
                            <video @click="handlePreviewRightImage" v-if="currentItem.attach_type === 2" class="upload-form-right-container-resource" muted autoplay>
                                <source :src="currentItem.attach_url" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div style="line-height: 25px; word-wrap:break-word; word-break:break-all; ">
                                <p><span style="color: #999;">原名称：</span>{{ currentItem.attach_origin_name }}
                                <p><span style="color: #999;">新名称：</span>{{ currentItem.attach_name }}.{{ currentItem.attach_extension }}</p>
                                <p><span style="color: #999;">格式：</span>{{ currentItem.attach_minetype }}</p>
                                <p><span style="color: #999;">时间：</span>{{ currentItem.created_at }}</p>
                                <p><span style="color: #999;">大小：</span>{{ currentItem.attach_size / 1000 }}KB</p>
                                <!--                            <p>尺寸：1024 * 768 px</p>-->
                                <p style="margin-top: 10px;">
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
                <img v-if="currentItem.attach_type === 1" :src="currentItem.attach_url" style="max-width: 800px; max-height: 800px;" >
                <video v-if="currentItem.attach_type === 2" muted autoplay>
                    <source :src="currentItem.attach_url" type="video/mp4">
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
    import request from '@/plugins/request';
    import util from '@/libs/util';
    import Empty from '@/components/common/empty';
    export default {
        name: 'upload-form',
        components: {
            Empty
        },
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            uploadUrl: {
                type: String,
                default: '/admin/attachment/store'
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
                loading: true
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
                }).then(res => {
                    res.data.forEach((item, index) => {
                        item.attach_url = process.env.VUE_APP_UPLOAD_HOST_URL + item.attach_url;
                    });
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
                this.handleImageList();
            },
            handleTabClick (name) {
                if (name === 'stock') {
                    this.currentPage = 1;
                    this.handleImageList();
                }
            },
            handlePreviewImage (file) {
                this.imgVisible = true;
                this.currentVisibleImg = file.response ? process.env.VUE_APP_UPLOAD_HOST_URL + file.response.fullpath : '';
            },
            handlePreviewRightImage () {
                this.imgVisible = true;
                this.currentVisibleImg = this.currentItem.attach_url;
            },
            handleCloseModal () {
                this.imgVisible = false;
            }
        }
    }
</script>
<style lang="less" scoped>
    .upload-form {
        &-right-container {
            &-title {
                font-weight: bold;
                border-bottom: 1px solid #ebeef5;
                padding-bottom: 10px;
                margin-bottom: 10px;
            }
            &-resource {
                cursor: pointer;
                height: 80px;
                width: 80px;
            }
        }
    }
</style>
