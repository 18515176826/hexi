<template>
  <div class='orgin_module'>
    <div class='orgin_content'>
      <i />
      <span>滨江区</span>
    </div>
    <div class='Switching_area'>
      <ul class='Switching_ul' />
      <div>
        <span>确定</span>
        <span>取消</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Orgin',
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  },
}
</script>
<style lang="stylus" scoped>
.orgin_module {
  width: 144px;
  height: 44px;
  border: 1px solid rgba(98,176,252,1);
  border-radius:4px;
  position: absolute;
  top: 48px;
  right: 40px;
  cursor: pointer;
  .orgin_content {
    display: flex;
    align-items: center;
    height: 97%;
    border-radius: 4px;
    > i {
      width: 32px;
      height: 37px;
      margin: 0 8px 0 12px;
      background: url('~@/assets/img/location.png');
    }
    > span {
      color:rgba(232,236,246,1);
      font-size:24px;
    }
  }
  .Switching_area {
    display: none;
    position: absolute;
    top: 58px;
    right: 0;
    .Switching_ul {
      min-width: 520px;
      min-height: 120px;
      border: 1px solid #389DFB;
      background:rgba(40,74,208,0.6);
    }
  }
}
</style>