<template>
  <div class='grid_event'>
    <p class='last_tit'>{{lastName}}</p>
    <div class='grid_tab'>
      <ul class='personnel_thead'>
        <li>{{thead.firstNmae}}</li>
        <li>{{thead.secondName}}</li>
        <li>{{thead.thirdlyName}}</li>
        <li>{{thead.valid}}</li>
      </ul>
      <!-- <div
          class='personnel_tbody'
          @mousemove='handleStop'
          @mouseout='handleStart'
          :id='thead.id'> -->
      <div v-if='thead.id==="valid_wraper"' class='personnel_tbody'>
        <ul v-for='(item, ind) in eventTable' :key='ind + "a"'>
          <li><span>{{ind + 1}}</span></li>
          <li>{{item.orgName}}</li>
          <li>{{item.validityNum}}</li>
          <li>{{item.validityRate}}</li>
        </ul>
      </div>
      <div v-else class='personnel_tbody'>
        <ul v-for='(item, ind) in eventTable' :key='ind + "a"'>
          <li><span>{{ind + 1}}</span></li>
          <li>{{item.orgName}}</li>
          <li>{{item.addNum}}</li>
          <li>{{item.dealCompleteNum}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Pop',
  components: {

  },
  props: {
    eventTable: {
      type: [Array, Object],
    },
    lastName: {
      type: String,
    },
    thead: {
      type: Object,
    },
  },
  data() {
    return {
      allowScroll: true,
    }
  },
  watch: {
    eventTable() {

    },
  },
  mounted() {
    // const startTimeTemp = new Date().getTime()
    // const listWrapper = document.getElementById(this.thead.id)
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
      if (currentTimeTemp - startTimeTemp > 67 && flag) {
        if ((listWrapper.scrollTop + listWrapper.offsetHeight) < (maxHeight - 1)) {
          listWrapper.scrollTop += 1
        } else {
          listWrapper.scrollTop = 0
        }
        startTimeTemp = new Date().getTime()  // eslint-disable-line
      }
      requestAnimationFrame(() => this.autoScroll(startTimeTemp, listWrapper, this.allowScroll))
    },
  },
}

</script>
<style lang="stylus" scoped>
.grid_event {
  width: 50%;
  .last_tit {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 20px;
    font-family: tgafont;
    font-weight: 400;
    color: #d8dbfe;
    margin-bottom: 0;
  }
  .grid_tab {
    .personnel_thead {
      display: flex;
      width: 98%;
      color: #2DA0FF;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      height: 40px;
      line-height: 40px;
      background:rgba(40,74,208,0.2);
      li {
        width: 25%;
      }
    }
    .personnel_tbody::-webkit-scrollbar {
      width: 3px;
      height: 16px;
      background-color: #F5F5F5;
    }
    /*定义滚动条轨道 内阴影+圆角*/
    .personnel_tbody::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: rgba(40,74,208,0.3);
    }
    /*定义滑块 内阴影+圆角*/
    .personnel_tbody::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #555;
    }
    .personnel_tbody {
      height: 160px;
      width: 98%;
      overflow-y: auto;
      overflow-x: hidden;
      ul:nth-child(even) {
        height:40px;
        background:rgba(40,74,208,0.1);
      }
      ul {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #DDDEDF;
        display: flex;
        li:nth-child(1) {
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            width: 20px;
            height: 20px;
            border-style: solid;
            border-width: 1px;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            border-color: #66B8FB;
            background: rgba(102,184,251,0.2);;
            color: #66B8FB;
          }
        }
        li {
          width: 25%;
          text-align: center;
        }
      }
      ul:nth-child(1) {
        li:nth-child(1) {
          span {
            border-color: #ED654A;
            background: rgba(237,101,74,0.2);
            color: #ED654A;
          }
        }
      }
      ul:nth-child(2) {
        li:nth-child(1) {
          span {
            border-color: #ED8E4A;
            background: rgba(237,142,74,0.2);
            color: #ED8E4A;
          }
        }
      }
      ul:nth-child(3) {
        li:nth-child(1) {
          span {
            border-color: #EDB74A;
            background: rgba(237,183,74,0.2);;
            color: #EDD24A;
          }
        }
      }
    }
  }
}
</style>