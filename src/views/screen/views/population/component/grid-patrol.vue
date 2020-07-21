<template>
  <div class='essential'>
    <p>网格员巡查时长达标率</p>
    <div class='patrol'>
      <div>
        <ul class='personnel_thead'>
          <li>排名</li>
          <li>社区</li>
          <li>巡查时长达标网格员</li>
          <li>达标率</li>
        </ul>
        <!-- <div
          class='personnel_tbody'
          @mousemove='handleStop'
          @mouseout='handleStart'
          id='Inspect_length'> -->
        <div class='personnel_tbody'>
          <ul v-for='(item, ind) in gridTable' :key='ind + "a"'>
            <li><span>{{ind+1}}</span></li>
            <li>{{item.orgName}}</li>
            <li>{{item.inspectTimeUserNum}}</li>
            <li>{{item.onlineRatio}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InspectLength from '@/assets/dataList/Inspect_length.json'
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
      gridTable: InspectLength,
    }
  },
  watch: {
    orgId(val) {
      console.log(val)
    },
  },
  mounted() {
    this.inquireGridList()
    // const startTimeTemp = new Date().getTime()
    // const listWrapper = document.getElementById('Inspect_length')
    // setTimeout(() => requestAnimationFrame(() =>
    //   this.autoScroll(startTimeTemp, listWrapper, this.allowScroll)), 500)
  },
  methods: {
    inquireGridList() {
      this.$store
        .dispatch('globe/user/GridInquire', this.orgId)
        .then(res => {
          if (res.code === 200) {
            this.gridTable = res.data
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
  },
}

</script>
<style lang="stylus" scoped>
.patrol {
  width: 574px;
  height: 253px;
  padding: 13px 13px 0;
  background: url('~@/assets/img/k_1.png') no-repeat;
  background-size: 100% 100%;
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
    li:nth-child(1) {
      width: 12%;
    }
    li:nth-child(2) {
      width: 30%;
    }
    li:nth-child(3) {
      width: 30%;
    }
    li:nth-child(4) {
      width: 34%;
    }
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
  height: 200px;
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
      text-align: center;
    }
    li:nth-child(1) {
      width: 12%;
    }
    li:nth-child(2) {
      width: 30%;
    }
    li:nth-child(3) {
      width: 30%;
    }
    li:nth-child(4) {
      width: 34%;
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