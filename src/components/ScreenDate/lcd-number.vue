<template>
  <div>
    <span class='dateSize'>{{value}}</span>
  </div>
</template>
<style lang="scss" scoped>
.dateSize {
  font-size: 26px;
}
</style>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
    },
  },
  data() {
    return {

    }
  },
}
</script>