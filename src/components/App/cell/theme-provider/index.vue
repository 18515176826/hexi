<template>
  <div class='theme-wrapper' :style='`--theme:${theme};`' v-show='themeLoaded'>
    <slot />
  </div>
</template>

<script>
import './theme/theme.scss'
// import loadTheme from './script/loadTheme'
export default {
  name: 'ThemeProvider',
  props: {
    theme: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      themeLoaded: true,
      styleDom: document.createElement('style'),
    }
  },
  watch: {
    theme(t) {
      // 云图一般情况不强依赖 iview 组件库
      // loadTheme(t)
      document.body.className = ''
      document.body.classList.add(`theme-${t}`)
    },
  },
  async created() {
    // 云图一般情况不强依赖 iview 组件库
    // loadTheme(this.theme)
    document.body.className = ''
    document.body.classList.add(`theme-${this.theme}`)
  },
}
</script>

<style lang="scss" scoped>
.theme-wrapper{
  width: 100%;
  height: 100%;
}
</style>
