<template>
  <div>
    <div class='safeness'>
      <span class='safeness_title'>{{title + '：'}}</span>
      <div class='num_style'>
        <div v-for='(item, ind) in num' :key='ind + "c"'>
          <span v-if='parseInt(item)'>{{item}}</span>
          <b v-else>,</b>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Safeness',
  props: {
    title: {
      type: String,
    },
    num: {
      type: String,
    },
  },
  data() {
    return {

    }
  },
  watch: {
    num(val) {
      this.num = val
    },
  },
  mounted() {
    this.setNumber(this.num)
  },
  methods: {
    setNumber(num) {
      const numArr = []
      numArr.push(num, parseInt(','))
    },
  },
}

</script>
<style lang="stylus" scoped>
.safeness {
  width: 100%;
  display: flex;
  align-items: flex-end;
  .safeness_title {
    height:23px;
    font-size:24px;
    font-family:FZZhengHeiS-B-GB;
    font-weight:400;
    color:rgba(227,235,255,1);
    line-height:24px;
    margin-bottom: 5px;
  }
  .num_style {
    display: flex;
    > div {
      b {
        padding: 0 8px 0 0;
        color: #e3ebff;
        font-size: 45px;
      }
      span {
        width: 40px;
        height: 59px;
        background: rgba(92,96,169,0.1);
        border: 2px solid #4f5499;
        font-family: displayFreeTfb;
        font-weight: 400;
        color: #e3ebff;
        line-height: 65px;
        font-size: 38px;
        text-align: center;
        margin-right: 12px;
        text-indent: 10px;
        display:flex;
      }
    }
  }

}
</style>