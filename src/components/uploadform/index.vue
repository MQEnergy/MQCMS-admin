<template>
    <Tabs :animated="false" type="card">
        <TabPane label="本地图片">
            <Upload
                type="drag"
                ref="upload"
                :multiple="multiple"
                :before-upload="handleBeforeUpload"
                :headers="handleHeader"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                :action="uploadUrl">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽文件上传</p>
                </div>
            </Upload>
            <div v-for="(item, index) in fileList" :key="index" style="clear: both">
                上传的图片: {{ item.fileName }}
                <Button style="float: right; color: #1e93ff" type="text" @click="handleUpload(index)" :loading="item.loadingStatus">
                    {{ item.loadingStatus ? '上传中' : '点击上传' }}
                </Button>
            </div>
        </TabPane>
        <TabPane label="图库图片">
            <Row>
                <Col span="16">
                    <div style="position: relative; margin-bottom: 20px;">
                        <div @click="handleSelectStoreImg(index)" v-for="(item, index) in imgList" :key="index" style="position: relative; margin: 6px; width: 80px; height: 80px; display: inline-block; ">
                            <img :src="item.url" style="width: 80px; height: 80px; cursor: pointer" :alt="item.alt" srcset="">
                            <div v-if="item.isChoose" style="position: absolute; height: 82px; width: 82px; top: -1px; left: -1px; border: 2px solid #409EFF;">
                            </div>
                        </div>
                    </div>
                    <Page :total="100" show-total />
                </Col>
                <Col span="8">
                    <p style="font-weight: bold; border-bottom: 1px solid #ebeef5; padding-bottom: 10px; margin-bottom: 10px;">附件详情</p>
                    <img :src="currentStoreImg" style="height: 80px;" alt="">
                    <div style="line-height: 25px;">
                        <p>名称：1.png</p>
                        <p>时间：2018年2月12日</p>
                        <p>大小：758KB</p>
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
        <TabPane label="网络图片">
            <Input v-model="netPicUrl" placeholder="请输入网络图片地址">
                <span slot="prepend">网络图片</span>
            </Input>
            <p style="margin: 10px 0px">图片地址必须以http开头,以jpg,png,bmp,gif结束</p>
        </TabPane>
    </Tabs>
</template>

<script>
    import util from '@/libs/util';
    export default {
        name: 'upload-form',
        props: {
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                file: null,
                fileList: [],
                uploadUrl: '/admin/attachment/store',
                imgList: [
                    {
                        url: require('@/assets/images/default/1.png'),
                        alt: '',
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/2.png'),
                        alt: '',
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/3.png'),
                        alt: '',
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/4.png'),
                        alt: '',
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/5.png'),
                        alt: '',
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/6.png'),
                        alt: '',
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/7.png'),
                        alt: '',
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/8.png'),
                        alt: '',
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/9.png'),
                        alt: '',
                        isChoose: false
                    },
                    {
                        url: require('@/assets/images/default/10.png'),
                        alt: '',
                        isChoose: false
                    }
                ],
                currentStoreImg: '',
                netPicUrl: ''
            }
        },
        computed: {
            handleHeader () {
                const token = util.cookies.get('token');
                if (token) {
                    return {
                        Authorization: 'Bearer ' + token
                    }
                }
            }
        },
        methods: {
            handleBeforeUpload (file) {
                this.fileList.push({
                    loadingStatus: false,
                    fileOrigin: file,
                    fileName: file.name
                });
                return false;
            },
            handleUpload (index) {
                this.fileList[index].loadingStatus = true;
                new Promise((resolve, reject) => {
                    this.$refs.upload.post(this.fileList[index].fileOrigin);
                    resolve();
                }).then(res => {
                    this.fileList[index].loadingStatus = false;
                    this.fileList.splice(index, 1);
                });
            },
            handleUploadSuccess (res, file, fileList) {
                this.$Message.success('上传成功');
                console.info('file: ', file, 'fileList: ', fileList)
            },
            handleUploadError (err, response, file) {
                this.$Message.error(response.message);
            },
            handleSelectStoreImg (index) {
                this.currentStoreImg = this.imgList[index].url;
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
            }
        }
    }
</script>
<style scoped>
</style>
