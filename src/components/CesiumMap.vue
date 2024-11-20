<template>
  <div class="map" id="cesiumContainer"></div>
  <ToolBar
    @zoomIn="zoomIn"
    @zoomOut="zoomOut"
    @resetZoom="resetZoom"
    @switchBaseMap="switchBaseMap"
    @emitMeasure="Measures"
  >
  </ToolBar>
</template>

<script setup>
import initViewer from '@/cesium/initViewer'
import switchMap from '@/cesium/switchBaseMap'
import { startMeasureDistance } from '@/cesium/measures'
import { useMapStore } from '@/stores/map'
import ToolBar from './ToolBar.vue'
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { Ion } from 'cesium'
import '../Widgets/widgets.css'

import { IONKEY } from '@/config/constants'
window.CESIUM_BASE_URL = '/'

// 设置cesium token
Ion.defaultAccessToken = IONKEY

const mapStore = useMapStore()
let viewer

onMounted(() => {
  // 如果该组件被反复销毁和挂载（例如通过路由切换），可能会导致 viewer 被多次初始化。
  // 检查 mapStore.viewer 是否已经存在，如果存在，避免重复初始化。
  if (!mapStore.viewer) {
    viewer = initViewer('cesiumContainer')
    mapStore.setViewer(viewer)
  } else {
    viewer = mapStore.viewer
  }

  console.log(mapStore.viewer)
})

const zoomIn = () => {
  if (viewer) {
    viewer.camera.zoomIn(500) // 参数是放大的距离，可以根据需求调整
  }
  // 放大
  console.log('zoomIn')
}
const zoomOut = () => {
  if (viewer) {
    viewer.camera.zoomOut(500) // 参数是缩小的距离
  }
  // 缩小
  console.log('zoomOut')
}
const resetZoom = () => {
  if (viewer) {
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(120.3, 30.43, 4000), // 设置经纬度和高度
    })
  }
  // 重置
  console.log('resetZoom')
}
const switchBaseMap = (type) => {
  // 切换底图
  console.log('switchBaseMap', type)
  if (viewer) {
    switchMap(viewer, type)
  }
}

const Measures = (type) => {
  // 测距
  console.log('emitMeasure', type)
  if (viewer) {
    startMeasureDistance(viewer)
  }
}
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 100%;
}
</style>
