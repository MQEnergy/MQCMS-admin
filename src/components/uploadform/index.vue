<template>
    <Tabs :animated="false" type="card" @on-click="handleTabClick">
        <TabPane name="local" v-if="isLocal" label="本地图片">
            <Upload
                type="drag"
                ref="upload"
                :multiple="multiple"
                :before-upload="handleBeforeUpload"
                :headers="setHeader"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
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
        </TabPane>
        <TabPane name="stock" v-if="isStock" label="图库图片">
            <Row>
                <Col span="16">
                    <div style="position: relative; margin-bottom: 20px;">
                        <div @click="handleSelectStoreImg(index)" v-for="(item, index) in imageList" :key="index" style="position: relative; margin: 6px; width: 80px; height: 80px; display: inline-block; ">
                            <img :src="item.attach_url" style="width: 80px; height: 80px; cursor: pointer">
                            <div v-if="item.isChoose" style="position: absolute; height: 82px; width: 82px; top: -1px; left: -1px; border: 2px solid #409EFF;">
                            </div>
                        </div>
                    </div>
                    <div style="margin: 0px auto; text-align: center">
                        <Page :total="imgTotal" show-total :current.sync="currentPage" :page-size="imgSize" @on-change="handleChange"/>
                    </div>
                </Col>
                <Col span="8">
                    <p style="font-weight: bold; border-bottom: 1px solid #ebeef5; padding-bottom: 10px; margin-bottom: 10px;">附件详情</p>
                    <img :src="currentItem.attach_url" style="height: 80px;" alt="">
                    <div style="line-height: 25px;">
                        <p>原名称：{{ currentItem.attach_origin_name }}
                        <p>新名称：{{ currentItem.attach_name }}.{{ currentItem.attach_extension }}</p>
                        <p>格式：{{ currentItem.attach_minetype }}</p>
                        <p>时间：{{ currentItem.created_at }}</p>
                        <p>大小：{{ currentItem.attach_size / 1000 }}KB</p>
                        <p>尺寸：1024 * 768 px</p>
                        <p>
                            <Poptip
                                confirm
                                title="您确认删除这张图片吗？"
                                @on-ok="handleOk"
                                @on-cancel="handleCancel">
                                <Button type="error" ghost size="small">永久删除</Button>
                            </Poptip>
                        </p>
                    </div>
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
</template>

<script>
    import request from '@/plugins/request';
    import util from '@/libs/util';
    export default {
        name: 'upload-form',
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
            }
            
        },
        data () {
            return {
                file: null,
                uploadedFileList: [],
                imgList: [
                    {
                        url: require('@/assets/images/default/1.png'),
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/2.png'),
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/3.png'),
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/4.png'),
                        isChoose: false
                    }
                ],
                currentStoreImg: '',
                currentItem: {},
                netPicUrl: '',
                currentPage: 1,
                imgTotal: 0,
                imgSize: 20
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
                return request({
                    url: this.imageListUrl,
                    method: 'get',
                    params: {
                        page: this.currentPage,
                        limit: this.imgSize
                    }
                }).then(res => {
                    this.imgList = res.data;
                    this.imgTotal = res.total;
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
                this.currentItem = this.imgList[index];
                this.imgList[index].isChoose = true;
                this.imgList.forEach((val, key) => {
                    if (key !== index) {
                        val.isChoose = false;
                    }
                })
            },
            handleOk () {
                console.log('OK')
            },
            handleCancel () {
                console.log('cancel')
            },
            handleChange (page) {
                this.currentPage = page;
                this.handleImageList();
            },
            handleTabClick (name) {
                if (name === 'stock') {
                    this.handleImageList();
                }
            }
        }
    }
</script>
<style scoped>
</style>
