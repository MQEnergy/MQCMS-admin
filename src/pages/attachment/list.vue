<template>
    <div class="i-table-no-border">
        <search-form ref="searchForm" @on-create-form="handleOpenUpdateCreate" @on-search="searchData" @on-reset="getData" />
        <div class="ivu-mt">
            <div style="position: relative;height: 100px;" v-if="loading">
                <Spin fix size="large"></Spin>
            </div>
            <Row :gutter="24" class="ivu-mt">
                <Col :xl="compact ? 8 : 4" :lg="compact ? 8 : 6" :md="12" :sm="12" :xs="24" v-for="(item, index) in limitData" :key="index" class="ivu-mb">
                    <i-link :to="item.attach_url" target="_blank">
                        <Card :bordered="bordered" :padding="0" class="search-search-projects-item">
                            <img :src="'http://localhost/MQCMS/' + item.attach_url" class="search-search-projects-item-cover">
                            <div class="ivu-p-8">
                                <div>
                                    <strong>{{ item.attach_name }}</strong>
                                </div>
                                <div class="search-search-projects-item-desc">{{ item.attach_origin_name }}</div>
                                <div class="search-search-projects-item-extra">
                                    <Time :time="item.created_at" type="datetime" />
                                </div>
                            </div>
                            <Divider class="ivu-mb-8 ivu-mt-8" />
                            <Row class="ivu-text-center ivu-pb-8">
                                <Col span="12" class="ivu-br">
                                    <Tooltip placement="top" content="删除图片">
                                        <i-link>
                                            <Button icon="md-trash" type="text" size="large" />
                                        </i-link>
                                    </Tooltip>
                                </Col>
                                <Col span="12">
                                    <Tooltip placement="top" content="查看">
                                        <i-link>
                                            <Button icon="md-eye" type="text" size="large" />
                                        </i-link>
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Card>
                    </i-link>
                </Col>
            </Row>
            <div class="ivu-mt ivu-text-center" slot="footer">
                <Page :total="total" show-total :current.sync="current" @on-change="handleChange"/>
            </div>
        </div>
        <!-- 创建编辑 -->
        <create-form ref="createForm" @on-create-form="handleOpenUpdateCreate" @on-ok="getData" />
    </div>
</template>
<script>
    import { AttachmentIndex, AttachmentSearch, AttachmentUpdate } from '@/api/attachment';
    import searchForm from './search-form';
    import createForm from './create-form';
    export default {
        components: {
            searchForm,
            createForm
        },
        data () {
            return {
                bordered: true,
                compact: true,
                loading: false,
                list: [],
                selectedData: [],
                current: 1,
                total: 0,
                size: 10,
                sortType: 'normal', // 当前排序类型，可选值为：normal（默认） || asc（升序）|| desc（降序）,
                sortColumns: '',
                filterType: undefined,
                searchForm: {}
            }
        },
        computed: {
            limitData () {
                let data = [...this.list];

                // 动态计算排序类型
                const sortColumns = this.sortColumns;
                if (this.sortType === 'asc') {
                    data = data.sort((a, b) => {
                        return a[sortColumns] > b[sortColumns] ? 1 : -1;
                    });
                }
                if (this.sortType === 'desc') {
                    data = data.sort((a, b) => {
                        return a[sortColumns] < b[sortColumns] ? 1 : -1;
                    });
                }

                // 动态计算过滤类型
                if (this.filterType && this.filterType.length) {
                    data = data.filter(item => {
                        return this.filterType.indexOf(item.status) >= 0;
                    });
                }

                // 判断是否有选中的数据
                const selectedNames = this.selectedData.map(item => item.id);
                data.map(item => {
                    item._checked = selectedNames.indexOf(item.id) >= 0;
                    return item;
                });

                return data;
            },
            // 因为要动态计算总页数，所以还需要一个计算属性来返回最终给 Table 的 data
            dataWithPage () {
                const data = this.limitData;
                const start = this.current * this.size - this.size;
                const end = start + this.size;
                return [...data].slice(start, end);
            }
        },
        methods: {
            getData () {
                this.loading = true;
                AttachmentIndex({
                    page: this.current,
                    limit: this.size
                }).then(async res => {
                    this.list = res.data;
                    this.total = res.total;
                }).finally(() => {
                    this.loading = false;
                });
            },
            searchData (searchForm) {
                this.list = [];
                this.searchForm = searchForm;
                this.loading = true;
                AttachmentSearch({
                    page: this.current,
                    limit: this.size,
                    search: searchForm
                }).then(async res => {
                    this.list = res.data;
                    this.total = res.total;
                }).finally(() => {
                    this.loading = false;
                });
            },
            // 点击排序按钮时触发
            handleSortChange ({ key, order }) {
                // 将排序保存到数据
                this.sortColumns = key;
                this.sortType = order;
                this.current = 1;
            },
            // 过滤条件改变时触发
            handleFilterChange () {
                // 从第一页开始
                this.current = 1;
            },
            // 选中一项，将数据添加至已选项中
            handleSelect (selection, row) {
                this.selectedData.push(row);
            },
            // 取消选中一项，将取消的数据从已选项中删除
            handleSelectCancel (selection, row) {
                const index = this.selectedData.findIndex(item => item.id === row.id);
                this.selectedData.splice(index, 1);
            },
            // 当前页全选时，判断已选数据是否存在，不存在则添加
            handleSelectAll (selection) {
                selection.forEach(item => {
                    if (this.selectedData.findIndex(i => i.id === item.id) < 0) {
                        this.selectedData.push(item);
                    }
                });
            },
            // 取消当前页全选时，将当前页的数据（即 dataWithPage）从已选项中删除
            handleSelectAllCancel () {
                const selection = this.dataWithPage;
                selection.forEach(item => {
                    const index = this.selectedData.findIndex(i => i.id === item.id);
                    if (index >= 0) {
                        this.selectedData.splice(index, 1);
                    }
                });
            },
            // 清空所有已选项
            handleClearSelect () {
                this.selectedData = [];
            },
            handleClickItem (name) {
                if (name === 'delete') {
                    this.$Modal.confirm({
                        title: '删除标签',
                        content: '确定批量删除标签吗？',
                        onOk: () => {
                            this.selectedData.forEach(item => {
                                const index = this.list.findIndex(i => i.id === item.id);
                                if (index >= 0) {
                                    this.list.splice(index, 1);
                                }
                            });
                            this.selectedData = [];
                        }
                    });
                }
            },
            // 编辑创建数据
            handleOpenUpdateCreate (status, updateIndex) {
                this.$refs.createForm.handleShowUpdateCreate(status, updateIndex);
            },
            handleDelete (index) {
                this.updateIndex = index;
                this.$Modal.confirm({
                    title: '删除标签',
                    content: '确定删除该标签吗？',
                    onOk: () => {
                        AttachmentUpdate({
                            id: this.list[index].id
                        }).then(res => {
                            this.$Message.success('删除成功');
                            this.current = 1;
                            this.getData();
                        }).finally(() => {
                        });
                    }
                });
            },
            handleChange (page) {
                this.current = page;
                if (this.searchForm) {
                    this.searchData(this.searchForm);
                } else {
                    this.getData();
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .search-search-projects{
        &-item{
            &-cover{
                width: 100%;
                height: 200px;
                border-radius: 4px 4px 0 0;
            }
            &-desc{
                display: -webkit-box;
                height: 40px;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            &-extra{
                span{
                    display: inline-block;
                    color: #808695;
                    vertical-align: middle;
                }
            }
        }
    }
</style>

