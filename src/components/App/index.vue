<template>
  <div v-auto-scale='{ width: 2240, height: 1080 }' style='width: 100%; height: 100%'>
  <!-- <div style='width: 3072px; height: 1296px'> -->
    <theme-provider id='app' :theme='theme'>
      <router-view />
    </theme-provider>
  </div>
</template>
<script>
import ThemeProvider from './cell/theme-provider'
export default {
  name: 'App',
  components: {
    ThemeProvider,
  },
  data() {
    return {}
  },
  computed: {
    theme() {
      return this.$store.getters['globe/user/userTheme']
    },
    config() {
      return this.$store.getters['globe/user/conf']
    },
  },
  watch: {
    // 宇视播放插件依赖 若干配置参数
    config(c) {
      const { ysConf } = c
      if (ysConf) {
        const { ip: ipPort, username, password } = JSON.parse(ysConf)
        const [ip, port] = ipPort.split(':')
        this.svp.YSSsoLogin(ip, username, password, port)
      }
    },
  },
}
</script>
<style lang="scss">
:global {
  html,
  body {
    height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
  }
  #app {
    height: 100%;
    overflow-x: auto;
  }
  body {
    margin: 0;
    // font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "avenir next", avenir,
      helvetica, "helvetica neue", Ubuntu, "segoe ui", arial, sans-serif;
  }
  .page {
    text-align: center;
  }
  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }
}
</style>
