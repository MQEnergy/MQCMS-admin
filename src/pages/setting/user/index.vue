<template>
    <div>
        <Row :gutter="24">
            <Col :xl="7" :lg="7" :md="24" :sm="24" :xs="24" class="ivu-mb">
                <Card :bordered="false" dis-hover>
                    <div class="ivu-text-center">
                        <Avatar :src="user.avatar" class="setting-user-avatar" />
                        <p class="ivu-m-8">
                            <strong v-font="20">{{ user.name }}</strong>
                        </p>
                        <p>{{ user.sign }}</p>
                    </div>
                    <DescriptionList :col="1" class="ivu-mt">
                        <Description>
                            <Icon type="ios-briefcase-outline" slot="term" class="ivu-mr-8" />
                            <span>前端工程师</span>
                        </Description>
                        <Description>
                            <Icon type="ios-git-network" slot="term" class="ivu-mr-8" />
                            <span>中台-数据平台团队-前端创新团队-前端架构和平台工具团队</span>
                        </Description>
                        <Description>
                            <Icon type="ios-pin-outline" slot="term" class="ivu-mr-8" />
                            <span>北京市</span>
                        </Description>
                    </DescriptionList>
                    <div>
                        <Row type="flex" justify="center" align="middle" class="ivu-text-center">
                            <Col span="6">
                                <Tooltip placement="top" content="微博">
                                    <a href="https://weibo.com/336999699" target="_blank">
                                        <Avatar :src="icon.weibo" />
                                    </a>
                                </Tooltip>
                            </Col>
                            <Col span="6">
                                <Tooltip placement="top" content="知乎">
                                    <a href="https://www.zhihu.com/people/aresn" target="_blank">
                                        <Avatar :src="icon.zhihu" />
                                    </a>
                                </Tooltip>
                            </Col>
                            <Col span="6">
                                <Tooltip placement="top" content="Facebok">
                                    <a href="https://www.facebook.com/icarusion" target="_blank">
                                        <Avatar :src="icon.facebook" />
                                    </a>
                                </Tooltip>
                            </Col>
                            <Col span="6">
                                <Tooltip placement="top" content="Twitter">
                                    <a href="https://twitter.com/iViewUI" target="_blank">
                                        <Avatar :src="icon.twitter" />
                                    </a>
                                </Tooltip>
                            </Col>
                        </Row>
                    </div>
                    <Divider dashed />
                    <DescriptionList title="标签" />
                    <div>
                        <Tag v-for="item in user.tags" :key="item">{{ item }}</Tag>
                        <Input v-model="newIcon" ref="tag" size="small" autofocus v-if="addIcon" v-width="100" @on-enter="handleAddNewTag" @on-blur="addIcon = false" />
                        <Button size="small" type="dashed" icon="md-add" v-else @click="handleOpenNewTag" />
                    </div>
                </Card>
            </Col>
            <Col :xl=17 :lg="17" :md="24" :sm="24" :xs="24">
                <Card :bordered="false" dis-hover :padding="0">
                    <div class="ivu-pt-8">
                        <Tabs v-model="currentTab">
                            <TabPane label="文章（5）" name="article" />
                            <TabPane label="项目（8）" name="project" />
                            <TabPane label="应用（8）" name="app" />
                        </Tabs>
                    </div>
                    <div class="ivu-pl ivu-pr ivu-pb">
                        <article-template v-if="currentTab === 'article'" :article-list="articleList" hide-cover />
                        <project-template v-if="currentTab === 'project'" :project-list="projectList" compact bordered />
                        <app-template v-if="currentTab === 'app'" :app-list="appList" compact bordered />
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import iconWeibo from '@/assets/svg/icon-social-weibo.svg';
    import iconZhihu from '@/assets/svg/icon-social-zhihu.svg';
    import iconFacebook from '@/assets/svg/icon-social-facebook.svg';
    import iconTwitter from '@/assets/svg/icon-social-twitter.svg';

    import articleTemplate from '../../search/search-article/template';
    import projectTemplate from '../../search/search-projects/template';
    import appTemplate from '../../search/search-apps/template';

    import dataArticle from '../../search/search-article/data';
    import dataProject from '../../search/search-projects/data';
    import dataApp from '../../search/search-apps/data';

    export default {
        name: 'setting-user',
        components: { articleTemplate, projectTemplate, appTemplate },
        data () {
            return {
                user: {
                    name: 'Aresn',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    sign: '满招损，谦受益。',
                    tags: [
                        '大神',
                        '最强王者',
                        '落地成盒',
                        '很有想法',
                        '懂点设计',
                        '菜烧的不错'
                    ]
                },
                icon: {
                    weibo: iconWeibo,
                    zhihu: iconZhihu,
                    facebook: iconFacebook,
                    twitter: iconTwitter
                },
                addIcon: false,
                newIcon: '',
                currentTab: 'article',
                articleList: dataArticle,
                projectList: dataProject,
                appList: dataApp
            }
        },
        methods: {
            handleOpenNewTag () {
                this.addIcon = true;
                this.$nextTick(() => {
                    this.$refs.tag.focus();
                });
            },
            handleAddNewTag () {
                if (this.newIcon) {
                    this.user.tags.push(this.newIcon);
                    this.newIcon = '';
                    this.addIcon = false;
                }
            }
        }
    }
</script>
<style lang="less">
    .setting-user{
        &-avatar{
            width: 72px;
            height: 72px;
            border-radius: 50%;
        }
    }
</style>
