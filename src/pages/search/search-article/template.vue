<template>
    <List item-layout="vertical" size="large">
        <ListItem v-for="(item, index) in articleList" :key="index">
            <ListItemMeta>
                <i-link :to="item.link" target="_blank" slot="title">{{ item.title }}</i-link>
                <div slot="description">
                    <Tag v-for="tag in item.tag" :key="tag">{{ tag }}</Tag>
                </div>
            </ListItemMeta>
            <div style="max-width: 700px;">
                {{ item.desc }}
            </div>
            <div class="ivu-mt">
                <Avatar :src="item.auth.avatar" size="small" /> {{ item.auth.name }} 发表于 {{ new Date(item.time) | date_format('YYYY-MM-DD HH:mm:ss') }}
            </div>
            <template slot="action">
                <li>
                    <Icon type="ios-star-outline" /> {{ item.collect }}
                </li>
                <li>
                    <Icon type="ios-thumbs-up-outline" /> {{ item.like }}
                </li>
                <li>
                    <Icon type="ios-chatbubbles-outline" /> {{ item.comment }}
                </li>
            </template>
            <template slot="extra" v-if="!hideCover">
                <img :src="item.cover + '/small'" v-width="280">
            </template>
        </ListItem>
    </List>
</template>
<script>
    export default {
        props: {
            articleList: {
                type: Array
            },
            hideCover: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
