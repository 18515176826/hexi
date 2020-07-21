<template>
  <div class='essential'>
    <p>网格员在线统计排名</p>
    <div class='member_ranking'>
      <ul class='grid_status'>
        <li v-for='(item, ind) in gridData' :key='ind + "d"'>
          <span>{{item.name + '：'}}</span>
          <span>{{item.rate + '%'}}</span>
        </li>
      </ul>
      <div>
        <ul class='personnel_thead'>
          <li :style='{width: "18%"}'>排名</li>
          <li :style='{width: "18%"}'>社区</li>
          <li :style='{width: "22%"}'>专职网格员</li>
          <li :style='{width: "22%"}'>在线专职网格员</li>
          <li :style='{width: "20%"}'>在线率</li>
        </ul>
        <!-- <div
          class='personnel_tbody'
          @mousemove='handleStop'
          @mouseout='handleStart'
          id='on_lineGrid'> -->
        <div class='personnel_tbody'>
          <ul v-for='(item, ind) in gridTable' :key='ind + "a"'>
            <li :style='{width: "18%"}'><span>{{ind+ 1}}</span></li>
            <li :style='{width: "18%"}'>{{item.orgName}}</li>
            <li :style='{width: "22%"}'>{{item.sumNum}}</li>
            <li :style='{width: "22%"}'>{{item.boundMapNum}}</li>
            <li :style='{width: "20%"}'>{{item.onlineRatio + '%'}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import onLine from '@/assets/dataList/onLine.json'
export default {
  name: 'Pop',
  components: {

  },
  props: {
    orgId: {
      type: Number,
    },
  },
  data() {
    return {
      allowScroll: true,
      gridData: [
        {
          name: '专职网格员',
          rate: '100',
        },
        {
          name: '在线专职网格员',
          rate: '100',
        },
        {
          name: '在线率',
          rate: '100',
        },
      ],
      gridTable: onLine,
    }
  },
  watch: {
    orgId(val) {
      console.log(val)
    },
  },
  mounted() {
    // const startTimeTemp = new Date().getTime()
    // const listWrapper = document.getElementById('on_lineGrid')
    // setTimeout(() => requestAnimationFrame(() =>
    //   this.autoScroll(startTimeTemp, listWrapper, this.allowScroll)), 500)
    this.OperatorStatistics()
  },
  methods: {
    OperatorStatistics() { // 网格员在线统计排名
      this.$store
        .dispatch('globe/user/GridStatistics', this.orgId)
        .then(res => {
          if (res.code === 200) {
            this.gridTable = res.data
          }
        })
        .catch(err => { // eslint-disable-line
          console.log(err)
        })
    },
    handleStop() { // 鼠标移入事件
      this.allowScroll = false
    },
    handleStart() { // 鼠标移入事件
      this.allowScroll = true
    },
    autoScroll(startTimeTemp, listWrapper, flag = true) { // 滚动
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
  },
}

</script>
<style lang="stylus" scoped>
.member_ranking {
  width: 574px;
  height: 281px;
  padding: 13px 13px 0;
  background: url('~@/assets/img/k_6.png') no-repeat;
  background-size: 100% 100%;
}
.grid_status {
  display: flex;
  justify-content: space-between;
  padding: 0 8px 8px;
  li {
    color: #DDDEDF;
    font-size: 16px;
  }
}
.personnel_thead {
  display: flex;
  width: 100%;
  color: #2DA0FF;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background:rgba(40,74,208,0.2);
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
  height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  ul:nth-child(even) {
    width:574px;
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

</style>