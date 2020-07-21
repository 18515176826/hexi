<template>
  <div>
    <p class='safeness_tit'>平安指数</p>
    <div class='peace_mark'>
      <peace-num class='left_location' :title='leftNum.title' :num='numSplit(leftNum.num)' />
      <peace-num class='right_location' :title='rightNum.title' :num='numSplit(rightNum.num)' />
    </div>
    <safety-list :PingAnIndexArr='PingAnIndexArr' />
  </div>
</template>
<script>
import peaceNum from './peace-num'
import safetyList from './safety-list'
export default {
  name: 'Pop',
  components: {
    peaceNum,
    safetyList,
  },
  props: {
    orgId: {
      type: Number,
    },
  },
  data() {
    return {
      leftNum: {
        title: '4月指数',
        num: '',
      },
      rightNum: {
        title: '全省平均分',
        num: '',
      },
      PingAnIndexArr: [],
    }
  },
  watch: {
    orgId(val) {
      this.orgId = val
    },
  },
  mounted() {
    this.PingAnIndex()
  },
  methods: {
    PingAnIndex() {
      this.$store
        .dispatch('globe/user/SafenessIndex', this.orgId)
        .then(res => {
          if (res.code === 200) {
            this.leftNum.num = this.numSplit(res.data.index)
            this.rightNum.num = this.numSplit(res.data.avgIndex)
            this.PingAnIndexArr = res.data.typeStat
          }
        })
        .catch(err => { // eslint-disable-line
          console.log(err)
        })
    },
    numSplit(num) {
      return num.toString()
    },
  },
}

</script>
<style lang="stylus" scoped>
.left_location {
  margin-left: -6px;
}
.right_location {
  margin-right: -16px;
}
.safeness_tit {
  height:60px;
  width: 100%;
  line-height: 60px;
  font-size:32px;
  font-family:FZZhengHeiS-M-GB;
  font-weight:400;
  color:rgba(255,255,255,1);
  text-shadow:0px 0px 36px rgba(200,55,82,0.14);
  text-align: center;
  margin-top: 32px;
}
.peace_mark {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: flex-end;
    height: 60px;
  }
}
</style>