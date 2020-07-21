<template>
  <div class='essential'>
    <p>网格事件统计</p>
    <div class='net_format'>
      <div class='first_tit'>
        <div>{{firstData.firstName+"："}}：<span>{{firstData.firstNum}}</span></div>
        <i />
        <div>{{lastData.firstName+"："}}<span>{{lastData.firstNum}}</span></div>
      </div>
      <div class='tab_list'>
        <gridding-mod
          :eventTable='eventTable'
          :lastName='firstData.lastName'
          :thead='theadA' />
        <gridding-mod
          :eventTable='concludeData'
          :lastName='lastData.lastName'
          :thead='theadB' />
      </div>

    </div>
  </div>
</template>
<script>
import valid from '@/assets/dataList/valid.json'
import conclude from '@/assets/dataList/conclude.json'
import griddingMod from './gridding-mod'

export default {
  name: 'Pop',
  components: {
    griddingMod,
  },
  props: {
    orgId: {
      type: Number,
    },
  },
  data() {
    return {
      firstData: {
        firstName: '2020年网格事件新增总数',
        firstNum: 24923,
        lastName: '事件有效性排名',
      },
      lastData: {
        firstName: '事件办结总数',
        firstNum: 25943,
        lastName: '事件办结率排名',
      },
      theadA: {
        id: 'valid_wraper',
        firstNmae: '排名',
        secondName: '社区',
        thirdlyName: '数量',
        valid: '事件有效率',
      },
      theadB: {
        id: 'conclude_wraper',
        firstNmae: '排名',
        secondName: '社区',
        thirdlyName: '数量',
        valid: '办结率',
      },
      concludeData: conclude, // 事件办结率排名
      eventTable: valid, // 事件有效性排名
    }
  },
  watch: {
    orgId(val) {
      this.orgId = val
    },
  },
  mounted() {
    this.EventConclude()
    this.EventEfficiency()
  },
  methods: {
    EventConclude() {
      this.$store
        .dispatch('globe/user/EventStudy', this.orgId)
        .then(res => {
          if (res.code === 200) {
            this.concludeData = res.data
          }
        })
        .catch(err => { // eslint-disable-line
          console.log(err)
        })
    },
    EventEfficiency() {
      this.$store
        .dispatch('globe/user/AnEffective', this.orgId)
        .then(res => {
          if (res.code === 200) {
            this.eventTable = res.data
          }
        })
        .catch(err => { // eslint-disable-line
          console.log(err)
        })
    },
  },
}

</script>
<style lang="stylus" scoped>
.essential {
  margin-top: 20px;
}
.net_format {
  width 834px;
  height 283px;
  padding: 13px;
  background: url('~@/assets/img/k_4.png') no-repeat;
  background-size: 100% 100%;
  .tab_list {
    display: flex;
    justify-content: space-between;
  }
  .first_tit {
    width: 100%;
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-size: 16px;
    display: flex;
    background:linear-gradient(180deg,rgba(85,109,255,0.3),
    rgba(45,67,139,0.3),rgba(85,109,255,0.3));
    position: relative;
    > i {
      width: 1px;
      height: 25px;
      border-right: 1px solid rgba(216,219,254,0.5);
      position: absolute;
      top: 12px;
      left: 50%;
    }
    > div {
      width: 50%;
      text-align: center;
    }
  }
}
</style>