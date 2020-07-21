<template>
  <article class='infomation'>
    <h1>TQ-TPL 云图模版</h1>
    <h2>已提供组件组件</h2>
    <ul>
      <li>AutoErrorImg: 图片组件，当目标图片资源加载失败时，自动使用事先预备的默认图片/错误提示图片</li>
      <li>ScrollList： 滚动加载列表，可设置水平或者垂直方向，自定义速度等等</li>
      <li>ThemeProvider： 主题配置(云图小概率可能会用到换肤)</li>
      <li>NotFound/PermissionDenied： 404/403 跳转页面，可在 <code>views/index.js</code> 做对应配置</li>
    </ul>
    <h2>已提供指令</h2>
    <ul>
      <li>auto-scale： 自动缩放组件，更具设计稿分辨率或者实际大屏分辨率做小屏幕自适应</li>
      <li>resize-dom： 针对dom元素的resize事件监听指令</li>
      <li>water-marker： 水印指令</li>
    </ul>
    <h2>已提供工具方法</h2>
    <ul>
      <li>time: 时间转指定格式字符串方法</li>
      <li>Debounce： 防抖</li>
      <li>Throttle： 节流</li>
    </ul>
    <h2>已提供业务组件</h2>
    <ul>
      <li>svp[shine-video-player]: 雪亮视频播放组件</li>
    </ul>
  </article>
</template>

<script>
export default {
  name: 'ScreenHome',
}
</script>

<style lang="scss" scoped>
.infomation{
  padding: 20px;
}
</style>
