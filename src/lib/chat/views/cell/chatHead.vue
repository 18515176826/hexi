<template>
  <div class='chat-head' :style='styleSet'>
    <div class='chat-name'>{{currentChat.name}}</div>
    <div class='chat-handdle'>
      <a class='close-icon' title='关闭' @click='$emit("close")' />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ChatHead',
  props: {
    scheme: String,
  },
  computed: {
    ...mapState('chat', ['currentChat']),
    styleSet() {
      let _style = ''
      switch (this.scheme) {
        case 'light':
          _style = '--backgroundColor: #fff;--color: #375876;--top: 0;--borderColor:#E4E4E4;--aTop:0'
          break
        case 'dark':
          _style = '--backgroundColor: #1F577C;--color: #fff;--top:-4px;--borderColor:#1F577C;--aTop:8px'
          break
      }
      return _style
    },
  },
}
</script>
<style lang="scss" scoped>
.chat-head {
  height: 48px;
  line-height: 48px;
  position: absolute;
  left: 180px;
  right: 0;
  padding: 0 18px;
  border-bottom: 1px solid var(--borderColor);
  background:var(--backgroundColor);
  top:var(--top);
  cursor:move;
  .chat-name {
    font-size: 14px;
    color: var(--color);
    float: left;
  }
  .chat-handdle {
    float: right;
    a {
      position: relative;
      top:var(--aTop);
      width: 18px;
      height: 18px;
      display: inline-block;
      margin-left: 20px;
      border-radius: 9px;
      background: #fff url('../../assets/img/close.svg') no-repeat;
    }
  }
}
</style>

