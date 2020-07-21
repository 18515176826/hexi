<template>
  <div class='date' :style='{fontSize: `${ledSize}px`}' v-venus-resize='resize'>
    <div class='line'>
      <lcd-number
        class='lcd-number'
        :value='year'
        color='#4BC8FF'
        :size='ledSize'
        defaultColor='transparent'
        background='transparent' />
      <span>年</span>
      <lcd-number
        class='lcd-number'
        :value='month'
        color='#4BC8FF'
        :size='ledSize'
        defaultColor='transparent'
        background='transparent' />
      <span>月</span>
      <lcd-number
        class='lcd-number'
        :value='day'
        color='#4BC8FF'
        :size='ledSize'
        defaultColor='transparent'
        background='transparent' />
      <span>日</span>
      <lcd-number
        class='lcd-number'
        :value='week'
        color='#4BC8FF'
        :size='ledSize'
        defaultColor='transparent'
        background='transparent' />
    </div>
    <div class='line right-line'>
      <lcd-number
        class='lcd-number'
        :value='h'
        color='#4BC8FF'
        :size='ledSize'
        defaultColor='transparent'
        background='transparent' />
      <span>:</span>
      <lcd-number
        class='lcd-number'
        :value='m'
        color='#4BC8FF'
        :size='ledSize'
        defaultColor='transparent'
        background='transparent' />
      <span>:</span>
      <lcd-number
        class='lcd-number'
        :value='s'
        color='#4BC8FF'
        :size='ledSize'
        defaultColor='transparent'
        background='transparent' />
    </div>
  </div>
</template>

<script>
import LcdNumber from '@/components/ScreenDate/lcd-number'
export default {
  name: 'ScreenDate',
  components: {
    LcdNumber,
  },
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    },
    syncRender: {
      type: Function,
      default: () => new Date(),
    },
    syncDuration: {
      type: Number,
      default: -1,
    },
    sync: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      timer: null,
      syncTimer: null,
      time: new Date(),
      ledSize: 20,
    }
  },
  computed: {
    year() {
      return this.time.getFullYear()
    },
    month() {
      return this.time.getMonth() + 1
    },
    day() {
      return this.time.getDate()
    },
    week() {
      const now = this.time
      const day = now.getDay()
      const weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')
      const week = weeks[day]
      return week
    },
    h() {
      const h = this.time.getHours()
      return h > 9 ? h : `0${h}`
    },
    m() {
      const m = this.time.getMinutes()
      return m > 9 ? m : `0${m}`
    },
    s() {
      const s = this.time.getSeconds()
      return s > 9 ? s : `0${s}`
    },
  },
  watch: {
    syncDuration(d) {
      if (this.syncDuration > 0) {
        this.startSyncTimer(d)
      } else {
        this.stopSyncTimer()
      }
    },
  },
  mounted() {
    if (this.syncDuration > 0) {
      this.startSyncTimer(this.syncDuration)
    }

    if (this.sync) {
      this.startSync()
    }
  },
  beforeDestroy() {
    this.stopSyncTimer()
    this.stopSync()
  },
  methods: {
    resize([w]) {
      this.ledSize = w / 23
    },
    startSync() {
      this.timer = setInterval(() => {
        this.time = new Date(this.time.getTime() + 1000)
      }, 1000)
    },
    stopSync() {
      this.timer && clearInterval(this.timer)
      this.timer = null
    },
    async startSyncTimer(d) {
      this.syncTimer = await setInterval(async () => {
        this.time = await this.syncRender()
      }, d)
    },
    stopSyncTimer() {
      this.syncTimer && clearInterval(this.timer)
      this.syncTimer = null
    },
  },
}
</script>

<style lang="scss" scoped>
.date{
  align-items: center;
  color: #98B7F5;
  justify-content: flex-end;
  flex-wrap: wrap;
  div.line {
    width: 100%;
    display: flex;
    font-size: 26px;
    margin-top: 10px;
    justify-content: flex-end;
  }
  .lcd-number{
    margin: 1px 5px 0;
  }
  .week{
    margin-left: 30px;
  }
}
</style>

