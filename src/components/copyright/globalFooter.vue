<template>
  <div>
    <footer class="mq-global-footer mq-copyright">
      <div class="mq-global-footer-links">
        <a v-for="item in links" :key="item.key" :href="item.href" target="_blank" :title="item.title">{{ item.title }}</a>
      </div>
      <div class="mq-global-footer-copyright">{{ copyright }}</div>
    </footer>
  </div>
</template>

<script>
    export default {
        name: "globalFooter",
        props: {
            links: {
                type: Array,
                default: {}
            },
            copyright: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
  .mq-global-footer {
    margin: 48px 0 24px 0;
    padding: 0 16px;
    text-align: center;
  }
  .mq-copyright {
    flex: 0 0 auto;
  }
  .mq-global-footer-links {
    margin-bottom: 8px;
  }
  .mq-global-footer-copyright {
    color: #808695;
    font-size: 14px;
  }
  .mq-global-footer-links a {
    font-size: 14px;
    color: #808695;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }
  .mq-global-footer-links a:not(:last-child) {
    margin-right: 40px;
  }
</style>
