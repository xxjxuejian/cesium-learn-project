<script setup>
import CesiumMap from '@/components/CesiumMap.vue'
</script>

<template>
  <div class="App">
    <div class="header">标题头</div>
    <div class="map-container">
      <CesiumMap></CesiumMap>
    </div>
  </div>
</template>

<style scoped lang="less">
.App {
  .header {
    height: 30px;
  }

  .map-container {
    height: calc(100vh - 30px);
  }
}
</style>
