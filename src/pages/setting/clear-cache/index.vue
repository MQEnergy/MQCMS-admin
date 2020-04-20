<template>
    <div>
        <div class="i-layout-page-header">
            <page-header title="" content="" hidden-breadcrumb />
        </div>
        <Card :bordered="false" dis-hover class="ivu-mt">
            <Row :gutter="15">
                <Col :xl="12" :lg="12" :md="12" :sm="12" :xs="12">
                    <Form style="margin-top: 30px;" ref="create" :model="createData" label-position="right" :label-width="20">
                        <FormItem label="" prop="cache_type">
                            <CheckboxGroup v-model="createData.cache_type">
                                <Checkbox label="1">网站前端页面缓存</Checkbox>
                                <Checkbox label="2">redis缓存</Checkbox>
                                <Checkbox label="3">后端代理缓存</Checkbox>
                                <Checkbox label="4">后端日志</Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleClearCache" :loading="btnLoading">清除缓存</Button>
                        </FormItem>
                        <FormItem>
                            <p v-color="'#19be6b'" v-for="(item, index) in currentElement" :key="index">{{ item.message }}</p>
                        </FormItem>
                    </Form>
                </Col>
            </Row>

        </Card>
    </div>
</template>
<script>
    import { AdminClearCache } from "@api/permission/admin";

    export default {
        name: 'setting-clear-cache',
        components: {
        },
        data () {
            return {
                createData: {
                    cache_type: ['1']
                },
                currentElement: [],
                btnLoading: false,
            }
        },
        computed: {
            listString: {
                get () {
                    return JSON.stringify(this.currentElement, null, 2);
                },
                set () {
                }
            },
        },
        methods: {
            handleClearCache () {
                this.$Modal.confirm({
                    title: '提示',
                    content: '请注意缓存清除可能对站点访问有影响，确定要清除缓存吗？',
                    onOk: () => {
                        this.btnLoading = true;
                        this.currentElement = [];
                        AdminClearCache({
                            type: this.createData.cache_type
                        }).then(res => {
                            this.currentElement = res;
                        }).finally(() => {
                            this.btnLoading = false;
                        });
                    },
                    onCancel: () => {
                    }
                });
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
