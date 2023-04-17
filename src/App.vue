<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>
<style>
/*解决表头不对齐*/
.el-table th.gutter {
  display: table-cell !important;
}
</style>
