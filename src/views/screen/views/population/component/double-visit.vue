<template>
  <div class='essential'>
    <p>双重走访率</p>
    <div class='double'>
      <dual-list
        :listId='interviewRate.id'
        :title='interviewRate.title'
        :list='interviewRate.interviewList' />
      <dual-list
      :listId='administration.id'
      :title='administration.title'
      :list='administration.interviewList' />
    </div>
  </div>
</template>
<script>
import doubleVisit from '@/assets/dataList/double_visit.json'
import administration from '@/assets/dataList/administration.json'
import dualList from '../component/dual-list'
export default {
  name: 'Pop',
  components: {
    dualList,
  },
  data() {
    return {
      interviewRate: {
        id: 'interview',
        title: '重点场所',
        interviewList: doubleVisit,
      },
      administration: {
        id: 'administration',
        title: '双重走访率',
        interviewList: administration,
      },
    }
  },
  mounted() {

  },
}

</script>
<style lang="stylus" scoped>
.essential {
  margin-top: 20px;
}
.double {
  width: 564px;
  height: 241px;
  background: url(/img/k_7.18e85b3a.png) no-repeat;
  background-size: 100% 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 13px 0;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
</style>