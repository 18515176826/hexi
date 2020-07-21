<template>
  <div class='essential'>
    <p>基础数据</p>
    <div class='essential_mod'>
      <div class='data'>
        <div class='d_tit'><div><i /><span>基础数据</span><i /></div></div>
        <ul>
          <li v-for='(item, ind) in basicData' :key='ind'>
            <p>{{item.name}}</p>
            <img :src='item.images' alt=''>
            <p>{{item.num}}</p>
          </li>
        </ul>
        <i class='shuxian' />
      </div>
      <div class='site'>
        <div class='d_tit'><div><i /><span>标准地址库</span><i /></div></div>
        <ul>
          <li v-for='(item, ind) in siteWarehouse' :key='ind'>
            <p>{{item.name}}</p>
            <img :src='item.images' alt=''>
            <p>{{item.num}}</p>
          </li>
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
    screenTit: {
      type: String,
    },
  },
  data() {
    return {
      params: 142387,
      basicData: [
        {
          name: '实有房屋',
          images: require('@/assets/img/jc_1.png'),
          num: '187,032',
        },
        {
          name: '实有人口',
          images: require('@/assets/img/jc_2.png'),
          num: '430,903',
        },
        {
          name: '实有企业',
          images: require('@/assets/img/jc_3.png'),
          num: '14,194',
        },
      ],
      siteWarehouse: [
        {
          name: '清洗数量',
          images: require('@/assets/img/jc_4.png'),
          num: '295,664',
        },
        {
          name: '数据总量',
          images: require('@/assets/img/jc_5.png'),
          num: '345,085',
        },
      ],
    }
  },
  mounted() {
    this.Essential()
  },
  methods: {
    Essential() {
      this.$store
        .dispatch('globe/user/EssentialData', this.params)
        .then(res => {
          if (res.code === 200) {
            this.basicData.forEach((key) => {
              if (key.name === '实有人口') {
                key.num = res.actualPopulation
              } else if (key.name === '实有房屋') {
                key.num = res.actualHouse
              } else if (key.name === '实有企业') {
                key.num = res.actualEnterprise
              }
            })
            this.siteWarehouse.forEach((val) => {
              if (val.name === '清洗数量') {
                val.num = res.addressCleanNum
              } else if (val.name === '数据总量') {
                val.num = res.addressTotalNum
              }
            })
          }
          console.log(res)
        })
          .catch(err => { // eslint-disable-line
          console.log(err)
        })
    },
  },
}
</script>
<style lang="stylus" scoped>
.essential p {
  font-size: 18px;
  color: #BCD6FD;
  text-align: center;
}
.essential_mod {
  width 600px;
  height 235px;
  background: url('~@/assets/img/k_1.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 8px;
  display: flex;
  .data, site {
    position: relative;
    width 315px;
    padding-top: 26px;
    padding-left: 28px;
    > i {
      position: absolute;
      width: 2px;
      height: 146px;
      background: -webkit-gradient(linear, left bottom, left top, from(#000), to(#8590d3));
      background: linear-gradient(0deg, #000, #8590d3);
      border-radius: 1px;
      top: 91px;
      right: -10px;
    }
    div.d_tit  {
      display: flex;
      width 110px;
      align-items: center;
      margin: 0 auto;
      justify-content: center;
      div {
        display: flex;
        align-items: center;
        i {
          width 16px;
          height 12px;
        }
        i:first-child {
          background: url('~@/assets/img/s_l.png') no-repeat;
          background-size: 100%;
        }
        i:last-child {
          background: url('~@/assets/img/s_r.png') no-repeat;
          background-size: 100%;
        }
        span {
          font-size:14px;
          font-family:FZZhengHeiS-M-GB;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:28px;
          padding: 0 10px;
        }
      }
    }
    > ul {
      display: flex;
      margin-top: 25px;
      li p:first-child {
        font-size: 14px;
        color: #E3EBFF;
        margin-bottom: -6px;
      }
      li p:last-child {
        margin-top: -8px;
        font-size: 18px;
      }
      li:nth-child(1) p:last-child {
        background:linear-gradient(180deg,rgba(158,241,253,0.84) 0%,
        rgba(96,233,253,0.84) 99.31640625%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        font-weight: bold;
      }
      li:nth-child(2) p:last-child {
        font-weight: bold;
        background: linear-gradient(180deg,rgba(38,116,252,0.84) 0%,
        rgba(97,183,254,0.84) 0%, rgba(45,160,255,0.84) 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
      li:nth-child(3)p:last-child {
        font-weight: bold;
        background:linear-gradient(180deg,rgba(158,241,253,0.84) 0%,
        rgba(96,233,253,0.84) 99.31640625%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
  }
  .site {
    position: relative;
    width 315px;
    padding-top: 26px;
    padding-left: 28px;
    > i {
      position: absolute;
      width: 2px;
      height: 146px;
      background: -webkit-gradient(linear, left bottom, left top, from(#000), to(#8590d3));
      background: linear-gradient(0deg, #000, #8590d3);
      border-radius: 1px;
      top: 91px;
      right: -10px;
    }
    div.d_tit  {
      display: flex;
      min-width 110px;
      align-items: center;
      margin: 0 auto;
      justify-content: center;
      div {
        margin-left: -15px
        display: flex;
        align-items: center;
        i {
          width 16px;
          height 12px;
        }
        i:first-child {
          background: url('~@/assets/img/s_l.png') no-repeat;
          background-size: 100%;
        }
        i:last-child {
          background: url('~@/assets/img/s_r.png') no-repeat;
          background-size: 100%;
        }
        span {
          font-size:14px;
          font-family:FZZhengHeiS-M-GB;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:28px;
          padding: 0 10px;
        }
      }
    }
    > ul {
      display: flex;
      margin-top: 25px;
      li p:first-child {
        font-size: 14px;
        color: #E3EBFF;
        margin-bottom: -6px;
      }
      li p:last-child {
        margin-top: -8px;
        font-size: 18px;
      }
      li:nth-child(1) p:last-child {
        background:linear-gradient(180deg,rgba(158,241,253,0.84) 0%,
        rgba(96,233,253,0.84) 99.31640625%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        font-weight: bold;
      }
      li:nth-child(2) p:last-child {
        font-weight: bold;
        background: linear-gradient(180deg,rgba(38,116,252,0.84) 0%,
        rgba(97,183,254,0.84) 0%, rgba(45,160,255,0.84) 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
      li:nth-child(3)p:last-child {
        font-weight: bold;
        background:linear-gradient(180deg,rgba(158,241,253,0.84) 0%,
        rgba(96,233,253,0.84) 99.31640625%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
  }
}
</style>