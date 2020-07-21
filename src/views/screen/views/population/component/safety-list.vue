<template>
  <ul class='security_module '>
    <li v-for='(item, ind) in PingAnIndexArr' :key='ind+"e"'>
      <p>{{item.value}}</p>
      <p>{{item.name}}</p>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Pop',
  components: {

  },
  props: {
    PingAnIndexArr: {
      type: Array,
    },
  },
  data() {
    return {
      PingAnIndex: [
        {
          PingName: '社会政治安全',
          pingNum: '98.03',
        },
        {
          PingName: '社会治安安全',
          pingNum: '91.56',
        },
        {
          PingName: '经济金融安全',
          pingNum: '97.10',
        },
        {
          PingName: '生产安全',
          pingNum: '98.82',
        },
        {
          PingName: '食品药品安全',
          pingNum: '98.06',
        },
        {
          PingName: '生态环境安全',
          pingNum: '94.23',
        },
        {
          PingName: '网络与信息安全',
          pingNum: '100',
        },
        {
          PingName: '经济金融安全',
          pingNum: '97.10',
        },
      ],
    }
  },
  watch: {
    PingAnIndexArr(val) {
      this.PingAnIndexArr = val
    },
  },
  mounted() {

  },
  methods: {

  },
}

</script>
<style lang="stylus" scoped>
.security_module {
  display: flex;
  margin-top: 32px;
  margin-bottom: 31px;
  li {
    width: 102px;
    height: 116px;
    margin: 0 4px;
    p:first-child {
      margin-top: 37px;
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
    p:last-child {
      margin-top: 10px;
      text-align: center;
      color: #bbf6fa;
      font-size: 13px;
    }
  }
  li:nth-child(odd) {
    background: url('~@/assets/img/odd.png') no-repeat;
    background-size: 100% 100%;
  }
  li:nth-child(even) {
    background: url('~@/assets/img/eve.png') no-repeat;
    background-size: 100% 100%;
  }
}
</style>