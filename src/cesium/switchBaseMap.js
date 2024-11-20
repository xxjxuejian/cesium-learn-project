import { WEBKEY } from '@/config/constants'
import * as Cesium from 'cesium'
export default function switchMap(viewer, imgType) {
  viewer.imageryLayers.removeAll()

  if (imgType === 'vec') {
    // 天地图矢量图层
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
    // 天地图矢量注记
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
  } else {
    // 天地图影像底图
    viewer.imageryLayers.addImageryProvider(
      new Cesium.WebMapTileServiceImageryProvider({
        url:
          'https://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' +
          WEBKEY,
        layer: 'img',
        style: 'default',
        tileMatrixSetID: 'w',
        format: 'tiles',
        maximumLevel: 18,
        subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      }),
    )
    // 天地图影像注记
    viewer.imageryLayers.addImageryProvider(
      new Cesium.WebMapTileServiceImageryProvider({
        url:
          'https://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' +
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
}
