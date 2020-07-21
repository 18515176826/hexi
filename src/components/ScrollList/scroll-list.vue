<template>
  <div class='wrapper' ref='wrapper'>
    <ul
      id='scroll'
      class='scroll'
      ref='scroll'
      @mousemove='stopScroll'
      @mouseout='doScroll'>
      <li v-for='(item, ind) in list' :key='ind'>
        <span>{{item.name}}</span>
        <span>{{item.num}}</span>
        <span>{{item.proportion}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Tablist',
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return { // eslint-disable-line
      formId: 'scroll',
      allowScroll: true,
      hasScroll: false,
      sTop: 0,
    }
  },
  mounted() {
    const startTimeTemp = new Date().getTime()
    const listWrapper = this.$refs.wrapper
    setInterval(() => this.autoScroll(startTimeTemp, listWrapper, this.allowScroll), 60) // eslint-disable-line
  },
  methods: {
    stopScroll() {
      this.allowScroll = false
    },
    doScroll() {
      this.allowScroll = true
    },
    autoScroll(startTimeTemp, listWrapper, flag = true) {
      const maxHeight = listWrapper.scrollHeight
      const currentTimeTemp = new Date().getTime()
      if (currentTimeTemp - startTimeTemp > 50 && flag) {
        if ((listWrapper.scrollTop + listWrapper.offsetHeight) < (maxHeight - 1)) {
          listWrapper.scrollTop += 1
        } else {
          listWrapper.scrollTop = 0
        }
      }
    },
  },
}
</script>
<style lang="stylus" scope>
  .wrapper {
      height: 152px;
      width: 100%;
      overflow: hidden;
    ul {
      color: #8ED8FF;
      font-size: 16px;
      li {
        height: 45px;
        line-height: 45px;
        display: flex;
        > span {
          width: 33%;
          padding-left: 15px;
        }
      }
      li:nth-child(even) {
        background: rgba(85,115,175,0.2);
      }
    }
  }
</style>