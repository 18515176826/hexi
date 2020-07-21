<template>
  <div class='essential'>
    <p>热词分析TOP5</p>
    <div class='hot_word'>
      <ul>
        <li>排名</li>
        <li>热词</li>
        <li>热度</li>
        <li>数量</li>
      </ul>
      <div
          @mousemove='handleStop'
          @mouseout='handleStart'
          id='list-wraper'
          class='hot_wor_style'>
        <ul
            v-for='(item, ind) in hotWorData'
            :key='ind+"b"'>
          <li>
            <span
              :class='[ind === 0 ? "first_red" :
              ind === 1 ? "second_orange" :
              ind === 2 ? "thirdly_yellow" : "common_blue"]'>
              {{ind+1}}
            </span>
          </li>
          <li>{{item.orgName}}</li>
          <li>
            <div class='quantity'>
              <p :style='CalculatedPercentage(parseInt(item.statisticCount))' />
            </div>
          </li>
          <li>{{item.statisticCount}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tit',
  props: {
    orgId: {
      type: Number,
    },
  },
  data() {
    return {
      maxDataArr: [],
      maxNum: 0,
      allowScroll: true,
      hotWorData: [
        {
          index: 1,
          name: '便民服务',
          num: 3276,
        },
        {
          index: 0,
          name: '消防安全',
          num: 2233,
        },
        {
          index: 2,
          name: '消防设施损坏停用',
          num: 1763,
        },
        {
          index: 5,
          name: '其它',
          num: 1740,
        },
        {
          index: 3,
          name: '综合执法',
          num: 1555,
        },
        {
          index: 4,
          name: '3月指数',
          num: 96.46,
        },
      ],
    }
  },
  watch: {
    orgId(val) {
      this.orgId = val
    },
  },
  mounted() {
    // const startTimeTemp = new Date().getTime()
    // const listWrapper = document.getElementById('list-wraper')
    // setTimeout(() => requestAnimationFrame(() =>
    //   this.autoScroll(startTimeTemp, listWrapper, this.allowScroll)), 500)
    this.wordsAnalysis() // 热词统计
    this.firstFiveHot()
  },
  methods: {
    firstFiveHot() {
      this.$store
        .dispatch('globe/user/HotWordsAnalysis', this.orgId)
        .then(res => {
          if (res.code === 200) {
            this.hotWorData = res.data
          }
        })
        .catch(err => { // eslint-disable-line
          console.log(err)
        })
    },
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
    CalculatedPercentage(num) { // 热词分析TOP5动态计算
      console.log(num, 555)
      const percent = { 'left': `${-(100 - (num / this.maxNum * 100).toFixed(2))}%` }
      return percent
    },
    wordsAnalysis() { // 數據占比
      this.hotWorData.forEach((key) => {
        this.maxDataArr.push(key.num)
      })
      this.maxNum = Math.max.apply(null, this.maxDataArr)
    },

  },
}
</script>
<style lang="stylus" scoped>
.hot_word {
  width: 574px;
  height: 281px;
  background: url('~@/assets/img/k_3.png') no-repeat;
  background-size: 100% 100%;
  padding: 0 13px;
  .hot_wor_style {
    height: 225px;
    overflow: hidden;
    ul {
      border-bottom: 1px solid rgba(38,51,83,1);
    }
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
      }
    }
    li:nth-child(3) {
      display: flex;
      align-items: center;
      justify-content: center;
      div.quantity {
        width: 260px;
        height: 8px;
        position: relative;
        overflow: hidden;
        p {
          position: absolute;
          width: 260px;
          height: 8px;
          background: #2A65F5;
          top: 0;
          left: 0;
        }
      }
    }
  }
  ul {
    display: flex;
    li {
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
    li:nth-child(1) {
      width: 12%;
    }
    li:nth-child(2) {
      width: 23%;
    }
    li:nth-child(3) {
      width: 54%;
    }
    li:nth-child(4) {
      width: 12%;
    }
  }
  > ul {
    margin-top: 2px;
    li {
      height: 47px;
      line-height: 47px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
.first_red {
  border-color: #ED654A;
  background: rgba(237,101,74,0.2);
  color: #ED654A;
}
.second_orange {
  border-color: #ED8E4A;
  background: rgba(237,142,74,0.2);
  color: #ED8E4A;
}
.thirdly_yellow {
  border-color: #EDB74A;
  background: rgba(237,183,74,0.2);;
  color: #EDD24A;
}
.common_blue {
  border-color: #66B8FB;
  background: rgba(102,184,251,0.2);;
  color: #66B8FB;
}
</style>