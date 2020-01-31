<template>
    <div class="upload-form">
        <Tabs v-model="currentTabName" :animated="false" type="card" @on-click="handleTabClick">
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
                            <Icon type="ios-cloud-upload" size="52" v-color="'#3399ff'"></Icon>
                            <p>点击或拖拽文件上传</p>
                        </div>
                    </Upload>
                    <div v-if="listLoading" style="position: relative; height: 50px;" >
                        <Spin fix size="large"></Spin>
                    </div>
                    <div v-else>
                        <div v-for="(item, index) in uploadedFileList" :key="index" style="clear: both">
                            附件名称: {{ item.fileName }}
                            <div style="float: right; ">
                                <Button style="color: #1e93ff; padding: 0px 5px;" type="text" @click="handleUpload(item, index)">点击上传</Button>
                                <Button style="color: #ed4014; padding: 0px 5px;" type="text" @click="handleRemove(item, index)">删除</Button>
                            </div>
                        </div>
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
                                    <div class="upload-form-left-container-container-img-item" v-for="(item, index) in imageList" :key="index" @click="handleSelectStoreImg(item, index)">
                                        <img v-if="item.attach_type === 1" :src="item.attach_full_url" >
                                        <template v-if="item.attach_type === 2">
                                            <video :ref="'videoCell'+index">
                                                <source :src="item.attach_full_url" :type="item.attach_minetype">
                                                此视频暂无法播放，请稍后再试
                                            </video>
                                        </template>
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
                            <div class="upload-form-right-container-resource" @click="handlePreviewRightImage" >
                                <img v-if="currentItem.attach_type === 1" :src="currentItem.attach_full_url" >
                                <template v-if="currentItem.attach_type === 2">
                                    <video ref="videoInfo" muted>
                                        <source :src="currentItem.attach_full_url" :type="currentItem.attach_minetype">
                                        此视频暂无法播放，请稍后再试
                                    </video>
                                </template>
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
                                <p class="upload-form-right-container-resource-del-button" v-if="isDel">
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
        <Modal title="预览附件" v-model="imgVisible" width="830" @on-cancel="handleCloseModal">
            <div v-if="currentItem" style="text-align: center">
                <img v-if="currentItem.attach_type === 1" :src="currentItem.attach_full_url" style="max-width: 800px; max-height: 800px;" >
                <template v-if="currentItem.attach_type === 2" >
                    <video-player
                            ref="videoPlayer"
                            :options="playerOptions"
                            :playsinline="true"
                            customEventName="customstatechangedeventname"
                            @play="onPlayerPlay($event)"
                            @pause="onPlayerPause($event)"
                            @ended="onPlayerEnded($event)"
                            @waiting="onPlayerWaiting($event)"
                            @playing="onPlayerPlaying($event)"
                            @loadeddata="onPlayerLoadeddata($event)"
                            @timeupdate="onPlayerTimeupdate($event)"
                            @canplay="onPlayerCanplay($event)"
                            @canplaythrough="onPlayerCanplaythrough($event)"
                            @statechanged="playerStateChanged($event)"
                            @ready="playerReadied">
                    </video-player>
                </template>
            </div>
            <div slot="footer">
                <Button type="error" @click="handleCloseModal">关闭</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import { videoPlayer } from 'vue-video-player'
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
            SearchForm,
            videoPlayer
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
            maxSize: {
                type: Number,
                default: 10 * 1024
            },
            formatLimit: {
                type: Array,
                default () {
                    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'mp4', 'avi', 'rmvb'];
                }
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
            },
            currentTab: {
                type: String,
                default: 'local'
            }
        },
        data () {
            return {
                currentTabName: this.currentTab,
                file: null,
                uploadedFileList: [],
                imgList: [],
                currentItem: undefined,
                currentIndex: undefined,
                netPicUrl: '',
                currentPage: 1,
                imgTotal: 0,
                imgSize: 20,
                imgVisible: false,
                loading: true,
                listLoading: false,
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
                playerOptions: {
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, //
                    language: 'zh-CN',
                    playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "",
                        src: ""
                    }],
                    poster: "",
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: true,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
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
            },
            player () {
                return this.$refs.videoPlayer.player;
            }
        },
        mounted () {
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
                new Promise((resolve, reject) => {
                    this.listLoading = true;
                    this.handleFormatError(file, reject);
                    this.handleMaxSize(file, reject);
                    resolve();
                }).then(() => {
                    this.uploadedFileList.push({
                        fileOrigin: file,
                        fileName: file.name
                    });
                }).catch(err => {
                    this.$Message.error({
                        content: err.message,
                        duration: 3
                    });
                }).finally(() => {
                    this.listLoading = false;
                });
                return false;
            },
            handleMaxSize (file, reject) {
                if (file.size > this.maxSize * 1024) {
                    reject({
                        code: 10001,
                        message: '文件大小不能超过' + this.maxSize / 1024 + 'MB. 如需修改请同时修改服务端package_max_length参数'
                    });
                    return false;
                }
                return true;
            },
            handleFormatError (file, reject) {
                const _file_format = file.name.split('.').pop().toLocaleLowerCase();
                const checked = this.formatLimit.some(item => item.toLocaleLowerCase() === _file_format);
                if (!checked) {
                    reject({
                        code: 10002,
                        message: '文件：'+ file.name +' 上传格式不支持，可支持格式：' + this.formatLimit.join('，')
                    });
                    return false;
                }
                return true;
            },
            handleUpload (item, index) {
                this.currentItem = item;
                this.currentIndex = index;
                this.$refs.upload.post(item.fileOrigin);
            },
            handleRemove (item, index) {
                this.uploadedFileList.splice(index, 1);
            },
            handleUploadSuccess (res, file, uploadedFileList) {
                this.$Message.success('上传成功');
                if (this.currentIndex !== undefined) {
                    this.uploadedFileList.splice(this.currentIndex, 1);
                }
                // console.info('file: ', file, 'uploadedFileList: ', uploadedFileList);
                this.$emit('on-success', file.response);
            },
            handleUploadError (err, response, file) {
                this.$Message.error(response.message || err.message);
            },
            handleSelectStoreImg (item, index) {
                item.isChoose = true;
                this.currentItem = item;
                if (item.attach_type === 2) {
                    this.$nextTick(() => {
                        if (this.$refs.videoInfo) {
                            this.$refs.videoInfo.load();
                            this.$refs.videoInfo.play();
                        }
                    });
                }
                this.imgList.forEach((val, key) => {
                    if (key !== index) {
                        val.isChoose = false;
                    }
                });
                this.$emit('on-select-image', item, index);
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
                this.$emit('on-select-image', undefined, 0);
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
                this.currentItem = file.response;
                this.handleVideoPreview();
                this.imgVisible = true;
            },
            handlePreviewRightImage () {
                this.handleVideoPreview();
                this.imgVisible = true;
            },
            handleVideoPreview () {
                if (this.currentItem.attach_type === 2) {
                    this.$nextTick(() => {
                        this.playerOptions.sources[0].src = this.currentItem.attach_full_url;
                        this.playerOptions.sources[0].type = this.currentItem.attach_minetype;
                        this.player && this.player.load();
                    });
                }
            },
            handleCloseModal () {
                if (this.currentItem.attach_type === 2) {
                    this.$nextTick(() => {
                        this.player && this.player.pause();
                    });
                }
                this.imgVisible = false;
            },
            // listen event
            onPlayerPlay(player) {
                // console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            onPlayerEnded(player) {
                // console.log('player pause!', player)
            },
            onPlayerWaiting(player) {
                // console.log('player pause!', player)
            },
            onPlayerPlaying(player) {
                // console.log('player pause!', player)
            },
            onPlayerLoadeddata(player) {
                // console.log('player pause!', player)
            },
            onPlayerTimeupdate(player) {
                // console.log('player pause!', player)
            },
            onPlayerCanplay(player) {
                // console.log('player pause!', player)
            },
            onPlayerCanplaythrough(player) {
                // console.log('player pause!', player)
            },
            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },
            // player is ready
            playerReadied(player) {
                console.log('the player is readied', player)
                // you can use it to do something...
                // player.[methods]
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
    .video-player {
        width: 600px;
        margin: 0 auto;
    }
</style>
