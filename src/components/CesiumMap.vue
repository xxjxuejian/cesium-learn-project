<template>
  <div class="map" id="cesiumContainer"></div>
  <ToolBar
    @zoomIn="zoomIn"
    @zoomOut="zoomOut"
    @resetZoom="resetZoom"
    @switchBaseMap="switchBaseMap"
    @emitMeasure="emitMeasure"
  >
  </ToolBar>
</template>

<script setup>
import ToolBar from './ToolBar.vue'
import { onMounted } from 'vue'
import * as Cesium from 'cesium'
import { Ion } from 'cesium'
import '../Widgets/widgets.css'
window.CESIUM_BASE_URL = '/'

// 设置cesium token
Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MmJlY2YxZS0xZWQ1LTRiNGItYjBlNy1iNmMwYTVjMzNiYzYiLCJpZCI6MjQ3NTIyLCJpYXQiOjE3MzIwMDE2MjB9.r2CklVFhmGaQxjLV1Spscr1WO_BBaOuRAnyeybN4QiE'

// 天地图token
const webKey = 'da499f7d0eeb7c2e4bf72b84b13a5918'
onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    // viewer = new Cesium.Viewer('cesiumContainer', {
    // 是否显示信息窗口
    infoBox: false,
    // 是否显示查询按钮
    geocoder: false,
    // 不显示home按钮
    homeButton: false,
    // 控制查看器的显示模式
    sceneModePicker: false,
    // 是否显示图层选择
    baseLayerPicker: false,
    // 是否显示帮助按钮
    navigationHelpButton: false,
    // 是否播放动画
    animation: false,
    // 是否显示时间轴
    timeline: false,
    // 是否显示全屏按钮
    fullscreenButton: false,
    // 关闭点击广告牌的绿色框
    selectionIndicator: false,
    shouldAnimate: true,
    // terrain: Cesium.Terrain.fromWorldTerrain()
  })

  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url:
        'https://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' +
        webKey,
      layer: 'img',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 18,
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }),
  )
  // 天地图矢量注记，注记就是地图上的各点的文本说明信息
  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url:
        'https://t0.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' +
        webKey,
      layer: 'cia',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 18,
      subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    }),
  )

  // 隐藏logo
  viewer.cesiumWidget.creditContainer.style.display = 'none'
  viewer.scene.globe.enableLighting = true
  // 取消天空盒显示
  viewer.scene.skyBox.show = false
  // 设置抗锯齿
  viewer.scene.fxaa = false
  viewer.scene.postProcessStages.fxaa.enabled = false
  // 提高采样率以提高细节
  viewer.scene.globe.maximumScreenSpaceError = 5 / 3 // 默认是2
  viewer.scene.globe.tileCacheSize = 1000 // 增加缓存大小
  viewer.scene.fog.enabled = false // 禁用雾化效果，增强图像清晰度

  // 改变当前地图的组织结构
  let layer = viewer.scene.imageryLayers.get(0)
  layer.minificationFilter = Cesium.TextureMinificationFilter.NEAREST
  layer.magnificationFilter = Cesium.TextureMagnificationFilter.NEAREST

  var position = Cesium.Cartesian3.fromDegrees(120.3, 30.43, 4000)

  viewer.camera.setView({
    // 指定相机位置
    destination: position,
    // 指定相机视角
    // orientation: {
    //   // 指定相机的朝向,偏航角
    //   heading: Cesium.Math.toRadians(20),
    //   // 指定相机的俯仰角,0度是竖直向上,-90度是向下
    //   pitch: Cesium.Math.toRadians(-20),
    //   // 指定相机的滚转角,翻滚角
    //   roll: 0,
    // },
  })
})

const zoomIn = () => {
  // 放大
  console.log('zoomIn')
}
const zoomOut = () => {
  // 缩小
  console.log('zoomOut')
}
const resetZoom = () => {
  // 重置
  console.log('resetZoom')
}
const emitMeasure = (type) => {
  // 测距
  console.log('emitMeasure', type)
}
const switchBaseMap = (type) => {
  // 切换底图
  console.log('switchBaseMap', type)
}
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 100%;
}
</style>
