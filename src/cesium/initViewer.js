import { WEBKEY } from '@/config/constants'
import * as Cesium from 'cesium'
export default function initViewer(cesiumContainerId) {
  const viewer = new Cesium.Viewer(cesiumContainerId, {
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
        WEBKEY,
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
        WEBKEY,
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

  const position = Cesium.Cartesian3.fromDegrees(120.3, 30.43, 4000)

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

  return viewer
}
