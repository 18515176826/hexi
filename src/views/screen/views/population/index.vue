<template>
  <div>
    <screen-title :screenTit='screenText' />
    <switch-organ />
    <div class='main_part'>
      <div class='left_mod'>
        <essential-data />
        <key-personnel />
        <hot-word :orgId='orgId' />
      </div>
      <div class='center_mod'>
        <pingAn-index :orgId='orgId' />
        <grid-events :orgId='orgId' />
        <flow-rate :orgId='orgId' />
      </div>
      <div class='right_mod'>
        <grid-ranking :orgId='orgId' />
        <grid-patrol :orgId='orgId' />
        <double-visit />
      </div>
    </div>
  </div>
</template>
<script>
import screenTitle from '@/components/screen-title'
import essentialData from './component/essential-data'
import keyPersonnel from './component/key-personnel'
import hotWord from './component/hot-word'
import pingAnIndex from './component/pingAn-index'
import gridEvents from './component/grid-events'
import flowRate from './component/flow-rate'
import gridRanking from './component/grid-ranking'
import gridPatrol from './component/grid-patrol'
import doubleVisit from './component/double-visit'
import switchOrgan from './component/switch-organ'
export default {
  name: 'Pop',
  components: {
    screenTitle,
    essentialData,
    keyPersonnel,
    hotWord,
    pingAnIndex,
    gridEvents,
    flowRate,
    gridRanking,
    gridPatrol,
    doubleVisit,
    switchOrgan,
  },
  data() {
    return {
      screenText: '滨江区综合信息指挥中心',
      orgId: 142387,
      leftBottomData: {},
    }
  },
  mounted() {

  },
}

</script>
<style lang="stylus" scoped>
.screen-map {
  display: flex;
  width: 98%;
  margin: 15px auto 0;
  height: 538px;
}
.epidemic-main-bottom {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 590px;
  padding: 0 30px 0;
}
.main_part {
  display: flex;
  margin: 0 38px 0;
  .left_mod {
    width 600px;
  }
}
.center_mod {
  width: 860px;
  margin: 0 48px 0 56px;
}
.right_mod {
  width: 600px;
}
</style>