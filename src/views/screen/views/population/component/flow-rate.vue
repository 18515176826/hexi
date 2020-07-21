<template>
  <div class='essential'>
    <p>事件流转率</p>
    <div class='event_flow'>
      <div id='event_flow' />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
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
      evendata: [101.21, 100.36, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 99.96, 99.89, 99.86, 99.86,
        99.81, 99.78, 99.71, 99.48, 98.82, 98.70, 97.99, 97.89],
      axisData: ['西陵社区', '水电社区', '庙后王社区', '襄七房社区', '西兴社区', '温馨社区', '马湖社区', '协同社区', '共联社区', '星民社区',
        '七甲闸社区', '新州社区', '金东方社区', '奥体社区', '滨和社区', '丹枫社区', '官河社区', '天官社区', '中兴社区', '江二社区', '长河社区',
        '江一社区', '江三社区', '长一社区', '长二社区', '闻涛社区', '月明社区', '晶都社区', '山一社区', '张家村社区', '汤家井社区', '塘子堰社区',
        '傅家峙社区', '汤家桥社区', '白马湖社区', '冠山社区', '钱潮社区', '观潮社区', '江汉社区', '新浦社区', '之江社区', '联庄社区',
        '杨家墩社区', '冠二社区', '东冠社区', '岩大房社区', '滨文社区', '彩虹社区', '六和社区', '滨盛社区', '新生社区', '浦联社区', '冠一社区',
        '山二社区', '东信社区', '向南社区', '西浦社区', '信诚社区', '明德社区', '江南社区'],
    }
  },
  watch: {
    orgId(val) {
      this.orgId = val
    },
  },
  mounted() {
    this.eventRateCharts(this.axisData, this.evendata, 'event_flow')
  },
  methods: {
    eventRateCharts(axisData, evendata, dom) {
      const eveCharts = echarts.init(document.getElementById(dom))
      const eventRateOptions = {
        title: {
          text: '',
          top: 20,
          left: 32,
          textStyle: {
            color: '#FA9854',
            fontSize: 16,
          },
        },
        grid: {
          left: '8%',
          right: '8%',
          bottom: '12%',
          top: '10%',
          containLabel: true,
        },
        tooltip: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 16,
          },
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 10,
            height: 8,
            bottom: 10,
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 10,
          },
        ],
        yAxis: [{
          type: 'value',
          axisLabel: {
            interval: 0,
            color: '#D9DFFF',
            fontSize: 16,
            formatter: '{value} %',
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgba(43, 70, 126, 1)', //左边线的颜色
              width: '1', //坐标线的宽度
            },
          },
          axisTick: {
            show: false,
          },
        }],
        xAxis: [{
          type: 'category',
          data: axisData,
          axisLabel: {
            interval: 0,
            color: '#D9DFFF',
            fontSize: 16,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgba(43, 70, 126, 1)', //左边线的颜色
              width: '1', //坐标线的宽度
            },
          },
          splitArea: {
            show: false,
            //  areaStyle: {
            //      color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            //  }
          },
        }],
        series: [{
          type: 'pictorialBar',
          symbol: 'path://M35,0L35,70L0,70z M35,0L35,70L70,70z',
          data: evendata,
          barWidth: '50%',
          // barGap: 1, //柱子之间间距
          symbolOffset: [0, -15],
          //					xAxisIndex: 0,
          //					yAxisIndex: 0,
          z: 99,
          label: {
            show: false,
            position: 'top',
            color: '#fff',
            fontSize: 16,
          },
          itemStyle: {
            normal: {
              color: function (params) {
                return params.dataIndex % 2 === 1 ?
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(71,179,255,0.3)',
                  }, {
                    offset: 0.5,
                    color: 'rgba(71,179,255,0.3)',
                  }, {
                    offset: 0.5,
                    color: 'rgba(71,179,255,1)',
                  }, {
                    offset: 1,
                    color: 'rgba(71,179,255,1)',
                  }]) : new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: 'rgba(51,189,216,0.3)',
                  }, {
                    offset: 0.5,
                    color: 'rgba(51,189,216,0.3)',
                  }, {
                    offset: 0.5,
                    color: 'rgba(51,189,216,1)',
                  }, {
                    offset: 1,
                    color: 'rgba(51,189,216,1)',
                  }])
              },
              opacity: 1,
            },
          },
        },
        {
          type: 'pictorialBar',
          symbol: 'diamond',
          barWidth: '50%',
          symbolSize: ['100%', 30],
          z: 99,
          itemStyle: {
            normal: {
              color: function (params) {
                return params.dataIndex % 2 === 1 ?
                  new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                    offset: 0,
                    color: 'rgba(71,179,255,0.8)',
                  }, {
                    offset: 0.5,
                    color: 'rgba(71,179,255,0.8)',
                  }, {
                    offset: 0.5,
                    color: 'rgba(71,179,255,1)',
                  }, {
                    offset: 1,
                    color: 'rgba(71,179,255,1)',
                  }]) : new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                    offset: 0,
                    color: 'rgba(51,189,216,0.8)',
                  }, {
                    offset: 0.5,
                    color: 'rgba(51,189,216,0.8)',
                  }, {
                    offset: 0.5,
                    color: 'rgba(51,189,216,1)',
                  }, {
                    offset: 1,
                    color: 'rgba(51,189,216,1)',
                  }])
              },
              opacity: 1,
            },
          },
          data: evendata,
        }],
      }
      eveCharts.setOption(eventRateOptions)
    },
  },
}

</script>
<style lang="stylus" scoped>
.essential {
  margin-top: 16px;
}
.event_flow {
  width: 860px;
  height: 224px;
  background: url('~@/assets/img/k_5.png') no-repeat;
  background-siez: 100% 100%;
  > div {
    width: 860px;
    height: 224px;
  }
}
</style>