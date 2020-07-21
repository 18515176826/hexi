<template>
  <div class='left_bottom'>
    <div class='title'>{{title}}</div>
    <!-- <div
      class='tab_box'
      :id='listId'
      @mousemove='handleStop'
      @mouseout='handleStart'> -->
    <div class='tab_box'>
      <ul class='cartogram'>
        <li v-for='(item, ind) in list' :key='ind+"e"'>
          <span>{{item.inteName}}</span>
          <div>
            <p :style='schedule(item.rate)' />
          </div>
          <span>{{item.rate + "%"}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pop',
  components: {

  },
  props: {
    title: {
      type: String,
    },
    list: {
      type: [Array, Object],
    },
    listId: {
      type: String,
    },
  },
  data() {
    return {
      allowScroll: true,
    }
  },
  mounted() {
    // const startTimeTemp = new Date().getTime()
    // const listWrapper = document.getElementById(this.listId)
    // setTimeout(() => requestAnimationFrame(() =>
    //   this.autoScroll(startTimeTemp, listWrapper, this.allowScroll)), 500)
  },
  methods: {
    handleStop() {
      this.allowScroll = false
    },
    handleStart() {
      this.allowScroll = true
    },
    autoScroll(startTimeTemp, listWrapper, flag = true) {
      const maxHeight = listWrapper.scrollHeight
      const currentTimeTemp = new Date().getTime()
      if (currentTimeTemp - startTimeTemp > 45 && flag) {
        if ((listWrapper.scrollTop + listWrapper.offsetHeight) < (maxHeight - 1)) {
          listWrapper.scrollTop += 1
        } else {
          listWrapper.scrollTop = 0
        }
        startTimeTemp = new Date().getTime()  // eslint-disable-line
      }
      requestAnimationFrame(() => this.autoScroll(startTimeTemp, listWrapper, this.allowScroll))
    },
    schedule(num) {
      const s_left = `${-(100 - num)}%`
      return { 'left': s_left }
    },
  },
}

</script>
<style lang="stylus" scoped>
.left_bottom {
  width: 49%;
  .tab_box::-webkit-scrollbar {
    width: 3px;
    height: 16px;
    background-color: #F5F5F5;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  .tab_box::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: rgba(40,74,208,0.3);
  }
  /*定义滑块 内阴影+圆角*/
  .tab_box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
  .tab_box {
    width: 100%;
    height: 190px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .title {
    height: 39px;
    font-size:15px;
    font-family:FZLanTingHei-M-GBK;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:39px;
    text-align: center;
  }
  .cartogram {
    li {
      height: 38px;
      line-height: 38px;
      font-size: 16px;
      border-top: 1px solid rgba(38,51,83,1);
      display: flex;
      align-items: center;
      span:first-child {
        min-width: 80px;
        text-align: right;
      }
      > div {
        width: 120px;
        height: 8px;
        position: relative;
        margin: 0 7px 0 7px;
        overflow: hidden;
        > p {
          position: absolute;
          width: 120px;
          height: 8px;
          background: #2A65F5;
          top: 0;
          left: 0;
        }
      }
    }
    li:nth-child(odd) {
      color: #7897E7;
    }
    li:nth-child(even) {
      color: #A4B1D4;
    }
  }
}
</style>