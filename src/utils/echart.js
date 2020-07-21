import echarts from 'echarts'

// 初始化图表
export const initChart = (el) => {
  const chart = echarts.init(el)
  return chart
}

// 重新加载图表
export const reloadChart = (chart, option) => {
  chart.setOption(option)
}