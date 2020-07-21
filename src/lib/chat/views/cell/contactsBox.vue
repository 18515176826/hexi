<template>
  <div class='contacts-box' :style='styleSet'>
    <div class='contacts-search'>
    <input
      type='text'
      id='contactSearch'
      placeholder='查找最近联系人'
      v-model='name'
      @blur='blur()'
      @focus='isFocus=true'>
      <ul class='search-list' v-if='isFocus'>
        <li v-if='searchMessageList.length===0&&name!==""'>暂无数据</li>
        <li
          v-else
          :title='item.name'
          v-for='(item,index) in searchMessageList'
          :key='index'
          @click='callChat(item)'>{{item.name}}</li>
      </ul>
  </div>
  <div class='contacts'>
    <ul>
      <li
      :class='["contacts-item",item.id===currentChat.id?"on":"" ]'
      @click='callContacts(item)'
      v-for='(item,index) in contactsList'
      :key='index'>
        <div class='close' @click.stop='closeContacts(item.id)' />
        <div class='info'>
          <div class='avatar'>
            <img src='../../assets/img/user-avatar.png'>
          </div>
          <div class='name' :title='item.name'>{{item.name}}</div>
          <div class='not-read' v-if='item.unReadCount>0&&currentChat.id!==item.id'>
            {{item.unReadCount}}
          </div>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ContactsBox',
  props: {
    scheme: String,
  },
  data() {
    return {
      isFocus: false,
      name: '', //最近聊天联系人，聊天名称
      style: [//light dark
        '--bc: #2D8CF0', '--bc: #2E7CA7',
        '--pt:10px', '--pt:12px',
        '--top: 0', '--top:-4px',
        '--searchB: #fff', '--searchB:#1F577C',
        '--searchAB: #EBEDF0', '--searchAB:#2E7CA7',
        '--searchC: #333', '--searchC:#fff',
        '--contactsB: #fff', '--contactsB:#184466',
        '--contactsHB: #EBEDF0', '--contactsHB:rgba(75,200,255,0.2)',
        '--contactsC: #333', '--contactsC:rgba(253,253,253,0.6)',
        '--contactsBC: #E4E4E4', '--contactsBC:rgba(253,253,253,0)',
        '--scrollB: #fff', '--scrollB:rgba(75,200,255,0.2)',
        '--scrollC: #c3c3c3', '--scrollC:rgba(253,253,253,0.6)',
      ],
    }
  },
  computed: {
    ...mapState('chat', ['contactsList', 'currentChat', 'searchMessageList']),
    userId() {
      return this.$store.getters['globe/user/userInfo'].id
    },
    styleSet() {
      let _style = ''
      switch (this.scheme) {
        case 'light':
		  _style = this.style.filter((v, i) => i % 2 === 0).join(';') //eslint-disable-line
          break
        case 'dark':
		  _style = this.style.filter((v, i) => i % 2 === 1).join(';')//eslint-disable-line
          break
      }
      return _style
    },
  },
  watch: {
    name() {
      if (this.name !== '') {
        this.searchByStr()
      } else {
        this.$store.commit('chat/updateSearchMessageList', [])
      }
    },
  },
  methods: {
    blur() {
      setTimeout(() => { this.isFocus = false }, 200)
    },
    closeContacts(id) {
      this.$store.commit('chat/delContacts', id)
      if (this.contactsList.length > 0) {
        this.callContacts(this.contactsList[0])
      }
    },
    callContacts(item) {
      // const { id: chatId, isGroup, fromUserId, createUserId } = item
      const { id: chatId, isGroup } = item
      this.$store.dispatch('chat/getChatById', { chatId, isGroup: `${isGroup}`, fromUserId: this.userId })
    },
    searchByStr() {
      this.$store.dispatch('chat/findMessageList', { fromUserId: this.userId, name: this.name }).then((rst) => {
        this.$store.commit('chat/updateSearchMessageList', rst)
      })
    },
    callChat(item) {
      item.id = item.chatId
      item.fromUserId = this.userId
      this.$store.commit('chat/updateContactsList', item)
      this.callContacts(item)
      this.isFocus = false
    },
  },
}
</script>
<style lang="scss" scoped>
.contacts-box {
  width: 180px;
	height: 100%;
	float: left;
	.contacts-search{
		height: 48px;
		background:  var(--bc);
		// background:  red;
		text-align: center;
		padding: var(--pt) 10px 0;
		box-sizing: border-box;
		position: relative;
		z-index: 10;
		top:var(--top);
		input {
			width: 100%;
			height: 28px;
			background: rgba(0,0,0,0.1) url('../../assets/img/search.svg') no-repeat 10px center;
			border: none;
			border-radius: 15px;
			color: #ffffff;
			padding-left: 32px;
			box-sizing: border-box;
			outline: none;
		}
		.search-list{
			position: absolute;
			top:40px;
			left: 10px;
			background: var(--searchB);
			width: 160px;
			max-height: 120px;
			overflow: hidden;
			border-radius: 5px;
			box-shadow: 0 0 20px rgba(25,25,25,.14);
			overflow-x: hidden;
      overflow-y: scroll;
			color:var(--searchC);
			&::-webkit-scrollbar {
				display: none;
			}
			li{
				text-align: left;
				height: 20px;
				line-height: 20px;
				padding-left: 10px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				cursor: pointer;
				&:hover{
					background: var(--searchAB);
				}
			}
		}
	}
	.contacts {
		height: calc(100% - 48px);
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;
		border-right: 1px solid var(--contactsBC);
		background: var(--contactsB);
		&::-webkit-scrollbar{
			width: 2px;
			background-color:var(--scrollB);
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 2px;
			background-color:var(--scrollC);
		}
		.contacts-item{
			height: 44px;
			cursor: pointer;
			&.on,&:hover{
				background: var(--contactsHB);
			}
			.close{
				width: 20px;
				float: left;
				height: 100%;
				line-height: 44px;
				text-align: center;
			}
			&:hover .close{
				background: url('../../assets/img/close-mini.svg') no-repeat;
				background-position:center center;
			}
			.info{
				height: 100%;
				width:calc(100% - 20px);
				float: right;
				border-bottom: 1px solid var(--contactsBC);
				display: flex;
				align-items: center;
				.avatar{
					width: 30px;
					img{
						width: 30px;
						height: 30px;
						border-radius: 15px;
					}
				}
				.name{
					font-size: 12px;
					color: var(--contactsC);
					// color: #333;
					padding-left: 10px;
          width: 100px;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
        .not-read{
          background: #f2554e;
          color: #fff;
          font-size: 12px;
          min-width: 14px;
          padding: 0 3px;
          // width: 14px;
          height: 14px;
          text-align: center;
          line-height: 14px;
          border-radius: 14px;
        }
			}
		}
	}
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: rgba(255,255,255,0.40);
}
</style>
