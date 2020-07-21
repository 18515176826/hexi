<template>
  <div date-titlt='页头'>
    <header>
      <div class='screen-header'>
        <span class='theme'>滨江区综合信息指挥中心</span>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: 'Tit',
  props: {
  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>
<style lang="stylus" scope>
.screen-header {
  width: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display flex;
  .project-name {
    width: 12%;
  }
  .theme {
    width: 100%;
    font-size: 42px;
    line-height 86px;
    letter-spacing: 15px;
    text-align: center;
    background: linear-gradient(to top, #76AAFF, #FFFFFF);
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>