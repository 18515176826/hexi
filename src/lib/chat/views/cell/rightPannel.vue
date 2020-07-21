<template>
  <div class='right-pannel' :style='styleSet'>
    <div class='group-info'>
      <!-- <div class='title'>{{isGroup?"调度组成员"+currentChat.users.length:"网格员信息"}}</div> -->
      <div class='title'>成员信息</div>
      <ul class='list'>
        <li
          class='item'
          v-for='(item,index) in users'
          :key='index'>
          <img src='../../assets/img/user-avatar.png'>
          <span class='name' :title='item.name'>{{item.name}}</span>
          <span class='tel'>{{item.mobile}}</span>
        </li>
        <li class='item' v-if='!isGroup&& currentChat.user'>
          <img src='../../assets/img/user-avatar.png'>
          <span class='name' :title='currentChat.user.name'>{{currentChat.user.name}}</span>
          <span class='tel'>{{currentChat.user.mobile}}</span>
        </li>
        <div class='detail' v-if='!isGroup&& currentChat.user'>
          <span class='grid'>所属区域</span>
          <span
            class='org-name'
            :title='currentChat.user.organization.orgName'>
            {{currentChat.user.organization.orgName}}
          </span>
        </div>
      </ul>
    </div>
    <div class='record' v-if='isSearch'>
      <div class='title close' @click='closeRecord'>消息记录</div>
      <ul class='record-list'>
        <li class='item' v-for='(item,index) in recordInfo.rows' :key='index'>
          <div
            class='data'
            v-if='isShowDate.indexOf(index)>-1'>
            {{item.sendTime.split(" ")[0]}}
          </div>
          <div class='head'>
            <img src='../../assets/img/user-avatar.png'>
            <span class='name' :title='item.fromUserName'>{{item.fromUserName}}</span>
            <span class='time'>{{item.sendTime.split(" ")[1]}}</span>
          </div>
          <div class='concat'>
            {{item.content.match(/!\[img\]\((.*?)\)/)?"[图片]":item.content}}
          </div>
        </li>
      </ul>
      <div class='search-page'>
        <div :class='["search",isSearchBystr?"":"hide"]'>
          <img src='../../assets/img/search.svg' @click='changeSearch'>
          <input
            type='text'
            id='contactSearch'
            v-model='searchStr'
            placeholder='请输入关键字'>
        </div>
        <div class='page' v-show='!isSearchBystr'>
           <Page
            :total='recordInfo.records'
            size='small'
            @on-change='getRecord'
            simple
            :current='recordInfo.page' />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'RightPannel',
  props: {
    scheme: String,
  },
  data() {
    return {
      isSearchBystr: false,
      searchStr: '',
      style: [//light dark
        '--scrollB: #fff', '--scrollB:rgba(75,200,255,0.2)',
        '--scrollC: #c3c3c3', '--scrollC:rgba(253,253,253,0.6)',
        '--bc: #fff', '--bc: #0A1F36',
        '--borC: #E4E4E4', '--borC: #0A1F36',
        '--titleC: #333', '--titleC: #fff',
        '--itemC: #666', '--itemC: rgba(255,255,255,0.6)',
        '--concatBC: #e4e4e4', '--concatBC: rgba(75,200,255,0.1)',
        '--dateB: #EFEFEF', '--dateB: rgba(75,200,255,0.1)',
        '--dateC: #333', '--dateC:rgba(75,200,255,0.8)',
        '--inputC: #333', '--inputC:#fff',
        '--SinputB: rgba(0,0,0,0.1)', '--SinputB:#2E7CA7',
        '--SinputC: #999', '--SinputC:#fff',
        '--placeholderC:rgba(153,153,153,0.40)', '--placeholderC:#fff',
      ],
    }
  },
  computed: {
    ...mapState('chat', ['currentChat', 'isSearch', 'recordInfo']),
    isGroup() {
      return this.currentChat.isGroup === 1
    },
    users() {
      //测试 两个人 发消息
      const result = []
      this.currentChat.users && this.currentChat.users.forEach((v) => {
        if (v.id) {
          result.push(v)
        } else {
          const [num] = v.$ref.match(/\d+/g)
          result.push(this.currentChat.messages[num].fromUser) //todo 问后端
        }
      })
      return result
    },
    isShowDate() {
      const result = []
      const dateArr = []
      this.recordInfo.rows.forEach((v, index) => {
        const [date] = v.sendTime.split(' ')
        if (dateArr.indexOf(date) === -1) {
          dateArr.push(date)
          result.push(index)
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
  methods: {
    closeRecord() {
      this.$store.commit('chat/changeIsSearch', false)
    },
    changeSearch() {
      if (this.isSearchBystr) {
        if (this.searchStr) {
          this.getRecord(1, this.searchStr)
        } else {
          this.getRecord(1)
          this.isSearchBystr = false
        }
      } else {
        this.isSearchBystr = true
      }
    },
    getRecord(page = 1, content = '') {
      const { id: chatId, isGroup } = this.currentChat
      const params = {
        page,
        rows: 10,
        chatId,
        isGroup: `${isGroup}`,
        content,
      }
      this.$store.dispatch('chat/getRecord', params)
    },

  },
}
</script>
<style lang="scss" scoped>
.right-pannel {
  height: calc(100% - 48px);
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 48px;
  width: 200px;
  background-color: var(--bc);
  border-left: 1px solid var(--borC);
  .title{
      width: calc(100% - 20px);
      height: 50px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: var(--titleC);
      letter-spacing: 0;
      line-height: 50px;
      padding-left: 10px;
      &.close{
        cursor: pointer;
        background: url('../../assets/img/close-mini.svg') no-repeat;
        background-size:14px;
				background-position:center right;
      }
    }
  .group-info{
    width: 100%;
    height: 100%;
    ul{
      padding: 10px;
      height: calc(100% - 50px);
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
      .item{
        height: 28px;
        display: flex;
        color: var(--itemC);
        img{
          width: 18px;
          height: 18px;
          border-radius: 50%;
        }
        .name{
          width: 48px;
          margin: 0 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .detail{
        display: flex;
          color: var(--itemC);
        .grid{
          display: inline-block;
          width: 60px;
        }
        .org-name{
          display: inline-block;
          width: calc(100% - 80px);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .record{
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background-color: var(--bc);
    z-index: 2;
    .record-list{
      padding: 10px;
      height: calc(100% - 100px);
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
      .item{
        .data{
          width: 120px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          opacity: 0.5;
          background:  var(--dateB);
          border-radius: 18px;
          font-size: 10px;
          color:var(--dateC);
          margin: 0 auto 10px;
        }
        .head{
          height: 28px;
          display: flex;
          color: var(--itemC);
          img{
            width: 18px;
            height: 18px;
            border-radius: 50%;
          }
          .name{
            width: 100px;
            margin: 0 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .concat{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: var(--titleC);
          letter-spacing: 0;
          line-height: 16px;
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid  var(--concatBC);
        }
      }
    }
    .search-page{
      height: 50px;
      line-height: 50px;
      background-color: var(--bc);
      box-shadow: 0 -2px 4px 0 rgba(0,0,0,0.10);
      align-items: center;
      position: relative;
      .search{
        width:100%;
        position: absolute;
        z-index: 2;
        left:5px;
        &.hide{
          width:40px;
          input{
            background-color: var(--bc);
            width: 28px;
          }
        };
        img{
          position: absolute;
          top:19px;
          left: 8px;
          z-index: 2;
          cursor: pointer;
        }
        input {
          transition: all .2s ease ;
          width: calc( 100% - 10px);
          height: 28px;
          background: var(--SinputB) ;
          border: none;
          border-radius: 15px;
          color:  var(--SinputC) ;
          padding-left: 28px;
          box-sizing: border-box;
          outline: none;
        }
      }
      .page{
        position: absolute;
        left:30px;
        /deep/ .ivu-page-next, /deep/ .ivu-page-prev{
          background: transparent;
        }
        /deep/ .ivu-page-simple .ivu-page-simple-pager input{
          background: transparent;
          color: var(--inputC);
        }
      }
    }
  }
}
 input::-webkit-input-placeholder{
    color:var(--placeholderC);
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:var(--placeholderC);
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:var(--placeholderC);
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:var(--placeholderC);
  }
</style>
