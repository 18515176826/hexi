<template>
  <transition name='fade'>
    <div
      class='chat-mask'
      v-if='show'
      @click='close'>
      <div
        class='chat-layer'
        ref='layer'
        v-if='show'
        @click.stop=''>
        <chat-head @mousedown.native='move' @close='close' :scheme='scheme' />
        <contacts-box :scheme='scheme' />
        <chat-box
          @close='close'
          :show='show'
          :scheme='scheme'
          ref='chatBox' />
        <right-pannel :scheme='scheme' />
      </div>
    </div>
  </transition>
</template>
<script>
import chatHead from './cell/chatHead'
import contactsBox from './cell/contactsBox'
import chatBox from './cell/chatBox'
import rightPannel from './cell/rightPannel'
export default {
  name: 'Chat',
  components: {
    chatHead,
    contactsBox,
    chatBox,
    rightPannel,
  },
  data() {
    return {
      show: false,
      scheme: 'light',
    }
  },
  computed: {
    userId() {
      return this.$store.getters['globe/user/userInfo'].id
    },
  },
  methods: {
    //创建聊天 同时打开聊天室
    //样式风格 发起人  接受人集合 类型1一键调度，2发送消息， 事件id
    createChat(scheme, fromUserId, toUserIds, type, issueId) {
      this.setStyle(scheme)
      this.show = true
      this.$store.dispatch('chat/createChat', { fromUserId, toUserIds, type, issueId }).then((rst) => {
        // const { id: chatId, isGroup, fromUserId, createUserId } = rst
        const { id: chatId, isGroup } = rst
        // this.$store.dispatch('chat/getChatById', { chatId, isGroup: `${isGroup}`, fromUserId: fromUserId || createUserId }).then(() => {
        this.$store.dispatch('chat/getChatById', { chatId, isGroup: `${isGroup}`, fromUserId: this.userId }).then(() => {
          this.$refs.chatBox.scrollToBottom()
        })
      })
    },
    //改变样式风格
    setStyle(scheme = 'dark') {//eslint-disable-line
      this.scheme = scheme
    },
    //打开聊天室
    open(scheme) {
      this.setStyle(scheme)
      this.show = true
    },
    close() {
      this.show = false
    },
    move(e) {
      const odiv = this.$refs.layer
      const disX = e.clientX - odiv.offsetLeft
      const disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => {
        const left = e.clientX - disX + 440
        const top = e.clientY - disY + 260
        this.positionX = top
        this.positionY = left
        odiv.style.left = `${left}px`
        odiv.style.top = `${top}px`
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.chat-mask{
  position: absolute;
  top:0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  .chat-layer {
    height: 520px;
    width: 880px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -260px;
    margin-left: -440px;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(25,25,25,.14);
    overflow: hidden;
    // background: #ffffff;
    z-index: 9999;
  }
}

.fade-enter-active, .fade-leave-active {
   transition: all .2s ease;
 }
.fade-enter{
  opacity: 0;
  transform: scale(.9)
}
.fade-leave-to {
  opacity: 0;
}
</style>
