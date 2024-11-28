<script setup>
// 加载各种影响图层
import * as Cesium from 'cesium'
import { onMounted, ref } from 'vue'
import { Ion } from 'cesium'
import '../Widgets/widgets.css'
import { IONKEY } from '@/config/constants'
import { WEBKEY } from '@/config/constants'
window.CESIUM_BASE_URL = '/'
Ion.defaultAccessToken = IONKEY

const viewer = ref(null)
function initViewer() {
  viewer.value = new Cesium.Viewer('cesiumContainer', {
    animation: false, // 动画小组件
    baseLayerPicker: false, // 底图组件，选择三维数字地球的底图（imagery and terrain）。
    fullscreenButton: false, // 全屏组件
    vrButton: false, // VR模式
    geocoder: false, // 地理编码（搜索）组件
    homeButton: false, // 首页，点击之后将视图跳转到默认视角
    infoBox: false, // 信息框
    sceneModePicker: false, // 场景模式，切换2D、3D 和 Columbus View (CV) 模式。
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, // 时间轴
    navigationHelpButton: false, // 帮助提示，如何操作数字地球。
    // 如果最初应该看到导航说明，则为true；如果直到用户明确单击该按钮，则该提示不显示，否则为false。
    navigationInstructionsInitiallyVisible: false,
  })
  //隐藏logo,js操作css样式
  viewer.value._cesiumWidget._creditContainer.style.display = 'none'
}

function removeLayers() {
  // 移除所有图层
  viewer.value.imageryLayers.removeAll()
}

// 添加OSM地图
function addOSMapLayer() {
  removeLayers()

  viewer.value.imageryLayers.addImageryProvider(
    new Cesium.OpenStreetMapImageryProvider({
      url: 'https://a.tile.openstreetmap.org/',
    }),
  )
}
// 添加天地图地图
function addTIANDIMAPLayer() {
  removeLayers()
  // 天地图矢量图层
  viewer.value.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url:
        'https://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' +
        WEBKEY,
      layer: 'img',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 18,
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }),
  )
  // 天地图矢量注记
  viewer.value.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url:
        'https://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' +
        WEBKEY,
      layer: 'cia',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 18,
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }),
  )
}

onMounted(() => {
  initViewer()
  setTimeout(() => {
    // addOSMapLayer()
    addTIANDIMAPLayer()
  }, 3000)
})
</script>

<template>
  <!-- Viewer界面介绍及组件显隐 -->
  <div id="cesiumContainer" class="map"></div>
</template>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
