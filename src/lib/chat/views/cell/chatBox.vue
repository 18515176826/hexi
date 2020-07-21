<template>
  <div class='chat-box' :style='styleSet'>
    <div class='chat-room' ref='chat-room'>
      <div class='chat-msg issue-msg' v-if='currentChat.dispatch'>
        <div class='msg-cont'>
          <p>{{currentChat.dispatch.title}}</p>
          {{currentChat.dispatch.content}}
          </div>
      </div>
      <div class='chat-msg issue-msg' v-if='currentChat.dispatchs&&currentChat.dispatchs[0]'>
        <div class='msg-cont'>
          <p>{{currentChat.dispatchs[0].title}}</p>
          {{currentChat.dispatchs[0].content}}
          </div>
      </div>
      <ul>
        <li
          :class='["chat-msg",item.fromUserId==userId?"i-send":"y-send" ]'
          v-for='(item,index) in currentChat.messages'
          :key='index'>
          <div class='msg-hd clearfix'>
            <span class='worker-avatar'>
              <img src='../../assets/img/user-avatar.png'>
            </span>
            <span class='name'>
              <Tooltip placement='bottom-start' v-if='item.fromUserId!=userId'>
                <div slot='content'>
                  {{fromUserList[item.fromUserId].mobile}}<br>
                  <p>{{fromUserList[item.fromUserId].orgName}}</p>
                </div>
                  {{item.fromUserName}}
              </Tooltip>
               <span v-else>我</span>
            </span>
            <span class='time'>{{item.sendTime}}</span>
          </div>
          <div class='msg-cont' v-if='item.tempImgUrl'>
            <img :src='item.tempImgUrl'>
          </div>
           <div class='msg-cont' v-else>{{item.content}}</div>
        </li>
      </ul>
    </div>
    <div class='chat-input'>
      <div class='top'>
        <!-- <a class='icon voice' /> -->
        <!-- <a class='icon video' @click='callVideo' v-if='false' /> -->
        <Upload
          class='upload-btn'
          :data='uploadData'
          :on-success='uploadSuccess'
          :on-error='uploadError'
          :show-upload-list='false'
          accept='image/*'
          :format='["jpg","jpeg","png","gif","bmp","tiff"]'
          action='/api/exception/social/upload'>
           <a class='icon pic' />
        </Upload>
        <a class='icon more' @click='getRecord'>消息记录</a>
      </div>
      <div class='con'>
        <textarea class='chat-edit' v-model='content' maxlength='300' />
      </div>
      <div class='bottom'>
        <div class='close' @click='$emit("close")'>关闭</div>
        <div class='send send-btn' @click='sendMessage()'>发送</div>
        <!-- <Button
          class='close'
          @click='$emit("close")'
          size='small'
          :style='{width:"80px"}'>关闭</Button>
        <Button
          class='send send-btn'
          @click='sendMessage'
          :disabled='isEmpty'
          :style='{width:"80px"}'
          size='small'>发送</Button> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ChatBox',
  props: {
    scheme: String,
  },
  data() {
    return {
      content: '',
      interval: null,
      style: [//light dark
        '--scrollB: #fff', '--scrollB:rgba(75,200,255,0.2)',
        '--scrollC: #c3c3c3', '--scrollC:rgba(253,253,253,0.6)',
        '--bc: #F8F8F8', '--bc: #13324f',
        '--tc: #666', '--tc: rgba(255,255,255,0.6)',
        '--ib: #CCE7FF', '--ib: #0C233D',
        '--iyb: #fff', '--iyb: #0C233D',
        '--ic: #333', '--ic:rgba(255,255,255,0.8)',
        '--issueB: #e9eff4', '--issueB:#0C233D',
        '--issueBC: #eff4f8', '--issueBC:#0C233D',
        '--bt: #E4E4E4', '--bt:rgba(75,200,255,0.2)',
        '--closeBR: #979797', '--closeBR:rgba(75,200,255,0.6)',
        '--closeC: #999', '--closeC:rgba(75,200,255,1)',
        '--sendB: #2D8CF0', '--sendB:rgba(75,200,255,0.8)',
        '--sendBR: #2D8CF0', '--sendBR:rgba(75,200,255,0.8)',
      ],
      uploadData: {
        actionId: 'pictureImport',
        fileName: '',
        type: '1',
      },
    }
  },
  computed: {
    currentChat() {
      //添加tempImgUrl
      const currentChat = this.$store.getters['chat/currentChat']
      console.log(currentChat)
      currentChat.messages && currentChat.messages.forEach(v => {
        const res = v.content.match(/!\[img\]\((.*?)\)/)
        if (res) {
          const [all, tempImgUrl] = res//eslint-disable-line
          v.tempImgUrl = tempImgUrl
        }
      })
      return currentChat
    },
    userId() {
      return this.$store.getters['globe/user/userInfo'].id
    },
    isEmpty() {
      return !this.currentChat.id
    },
    fromUserList() {
      const result = {}
      this.currentChat.messages.forEach(v => {
        if (v.fromUser && v.fromUser.id) {
          result[v.fromUser.id] = {
            mobile: v.fromUser.mobile,
            orgName: v.fromUser.organization.orgName,
          }
        }
      })
      return result
    },
    styleSet() {
      let _style = ''
      switch (this.scheme) {
        case 'light':
          _style = this.style.filter((v, i) => i % 2 === 0).join(';') //eslint-disable-line
          break
        case 'dark':
          _style = this.style.filter((v, i) => i % 2 === 1).join(';')//eslint-disable-line
      }
      return _style
    },
  },
  watch: {
    currentChat(n, o) {
      if (n.id && !o.id) {
        this.interval = setInterval(this.getUnReadMessage, 5000)
      } else if (!n.id) {
        if (this.interval) {
          clearInterval(this.interval)
        }
      }
    },
  },
  mounted() {
    if (this.currentChat.id) {
      this.interval = setInterval(this.getUnReadMessage, 5000)
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    getUnReadMessage() {
      // const { id: chatId, isGroup, fromUserId, createUserId } = this.currentChat
      const { id: chatId, isGroup } = this.currentChat
      // const realFrom =  isGroup === 1 ? createUserId : fromUserId
      const realFrom =  this.userId
      const params = {
        chatId,
        isGroup: `${isGroup}`,
        fromUserId: realFrom,
      }
      this.$store.dispatch('chat/findUnReadMessage', params).then((rst) => {
        this.currentChat.messages = this.currentChat.messages.concat(rst)
        this.scrollToBottom()
      })
    },
    sendMessage(content = this.content) {
      if (this.isEmpty) { return }
      // const { id: chatId, isGroup, fromUserId, createUserId, toUserId } = this.currentChat
      const { id: chatId, isGroup } = this.currentChat
      // const realFrom =  isGroup === 1 ? createUserId : fromUserId
      const realFrom =  this.userId
      const params = {
        chatId,
        isGroup: `${isGroup}`,
        content,
        fromUserId: realFrom,
      }
      this.$store.dispatch('chat/sendMessage', params).then(() => {
        const sendTime = this.$tool.reTime()
        this.currentChat.messages.push({
          fromUserId: realFrom, sendTime, content,
        })
        this.scrollToBottom()
        this.content = ''
      })
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatRoom = this.$refs['chat-room']
        chatRoom.scrollTop = chatRoom.scrollHeight
      })
    },
    getRecord() {
      // 获取消息记录 并打开
      const { id: chatId, isGroup } = this.currentChat
      const params = {
        page: 1,
        rows: 10,
        chatId,
        isGroup: `${isGroup}`,
      }
      this.$store.dispatch('chat/getRecord', params)
      this.$store.commit('chat/changeIsSearch', true)
    },
    callVideo() {
      // const id  = this.currentChat.toUserId
      // console.log(this.currentChat, this.vdc)
    //   if (!id) { return }
    //   const { roomView } = new this.$Voip()
    //   roomView.sendInvited(null, id)
    // if (!this.vdc.roomId) {
    //     this.vdc.createVoip(() => {
    //       this.vdc.invite(this.vdc.InviteType.MEETING, itm.id, {
    //         name: itm.name,
    //         sub: itm.organization.orgName,
    //         id: itm.id,
    //       })
    //     })
    //   } else {
    //     this.vdc.invite(this.vdc.InviteType.MEETING, itm.id, {
    //       name: itm.name,
    //       sub: itm.organization.orgName,
    //       id: itm.id,
    //     })
    //   }
    },
    uploadSuccess(data) {
      if (data.data.url) {
        this.sendMessage(`![img](${data.data.url})`)
      }
    },
    uploadError() {
      this.$Message.error('图片上传失败')
    },
  },
}
</script>
<style lang="scss" scoped>
.chat-box {
  width: 500px;
  height: calc(100% - 48px);
  float: left;
  margin: 48px 0 0 0;
  .chat-room{
    width: 500px;
    height: calc(100% - 150px);
    background: var(--bc);
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar{
			width: 2px;
			background-color:var(--scrollB);
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 2px;
			background-color:var(--scrollC);
		}
     .msg-cont{
       img{
         max-width: 300px;
         max-heigth: 100px;
       }
     }
    .i-send {
      text-align: right;
      .name {
        float: right;
        margin: 0 0 0 6px;
      }
      .worker-avatar{
        float: right;
        margin-left: 10px;
      }
      .msg-cont {
        background: var(--ib);
        // margin-right: 35px;
        text-align: left;
        word-wrap:break-word
      }
    }
    .y-send {
      .worker-avatar{
        margin-right: 10px;
        float: left;
      }
      .msg-cont {
        background: var(--iyb);
        color: var(--ic);
        border: 1px solid  var(--issueBC);
        word-wrap:break-word
        // margin-left: 35px;
      }
    }
    .issue-msg{
      text-align: center;
      .msg-cont {
        width: 470px;
        max-width: calc(100% - 40px);
        background: var(--issueB);
        border: 1px solid var(--issueBC);
        padding: 8px 10px;
        margin-top: 0px;
        text-align: left;
        p{
          text-align: center;
          font-weight: bold;
        }
      }
    }
    .chat-msg {
      padding: 16px 16px 5px;
    }
    .msg-hd {
      position: relative;
      z-index: 10;
      .worker-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        img{
          width: 100%;
          border-radius: 50%;
        }
      }
      .name {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color:var(--tc);
        letter-spacing: 1.53px;
      }
      .time {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color:var(--tc);
        letter-spacing: 1.31px;
        margin-left: 6px;
      }
    }
    .msg-cont {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      letter-spacing: 1.31px;
      line-height: 22px;
      padding: 5px;
      position: relative;
      display: inline-block;
      border-radius: 5px;
      margin-top:10px;
      color: var(--ic);
      max-width: calc(100% - 100px);
    }
  }
  .chat-input {
    background-color: var(--bc);
    height: 150px;
    width: 500px;
    border-top: 1px solid var(--bt);
    .top {
      height: 30px;
      width: 100%;
      padding-top: 10px;
      // overflow: hidden;
      .upload-btn{
        float: left;
      }
      .icon {
        height: 20px;
        width: 20px;
        margin-left: 20px;
        float: left;
        display: inline-block;
        vertical-align: middle;
        font-style: normal;
        color: #fff;
        &.voice{
          background: url('../../assets/img/voice.svg') center no-repeat;
          background-size: 12px;
        }
        &.pic{
          background: url('../../assets/img/pic.svg') center no-repeat;
          background-size:18px;
        }
        &.video{
          background: url('../../assets/img/video.svg') center no-repeat;
          background-size: 20px;
        }
        &.file{
          background: url('../../assets/img/file.svg') center no-repeat;
          background-size: 18px;
        }
        &.more{
          width: 63px;
          line-height: 20px;
          float: right;
          color: #2D8CF0;
          margin-right: 20px;
          background: url('../../assets/img/more.svg') right no-repeat;
          background-size: 8px;
        }
      }
    }
    .con {
      height: 80px;
      padding: 10px ;
      .chat-edit{
        height: 100%;
        width: 100%;
        background-color: transparent;
        border: none;
        font-size: 14px;
        color: var(--ic);
        float: left;
        border-radius: 2px;
        margin: 0;
        line-height: 20px;
        padding: 0 10px;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        cursor: text;
        resize: none;
        outline: none;
      }
      .chat-edit:empty{
        line-height: 20px;
      }
      .chat-edit:empty::before{
        color:#a8b5c2;
        content:attr(placeholder);
        line-height: 36px;
      }
    }
    .bottom{
      height: 40px;
      overflow: hidden;
       div {
        width: 80px;
        height: 24px;
        border-radius: 4px;
        line-height: 24px;
        text-align: center;
        font-size: 12px;
        display: inline-block;
        cursor: pointer;
        margin-top: 0;
      }
      .close {
        border: 1px solid var(--closeBR);
        color:  var(--closeC);;
        margin-left: 280px;
      }
      .send {
        border: 1px solid  var(--sendBR);;
        background:  var(--sendB);;
        color:  #fff;
        margin-left: 20px;
        float: none;
      }
    }
  }
}
.clearfix {
    zoom: 1;
}
</style>