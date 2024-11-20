import * as Cesium from 'cesium'

let handler // 处理鼠标事件的监听器
let startPosition = null // 起点坐标
let tempLineEntity = null // 临时线段实体
let distanceLabel = null // 临时距离标签
let viewer = null

export const startMeasureDistance = (viewer) => {
  viewer = viewer
  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

  // 左键点击记录起点
  handler.setInputAction((clickEvent) => {
    const earthPosition = viewer.scene.pickPosition(clickEvent.position)

    if (Cesium.defined(earthPosition)) {
      startPosition = earthPosition

      // 添加起点标记
      viewer.entities.add({
        position: startPosition,
        point: {
          pixelSize: 10,
          color: Cesium.Color.BLUE,
        },
      })

      // 初始化动态线段
      tempLineEntity = viewer.entities.add({
        polyline: {
          positions: [startPosition, startPosition],
          width: 3,
          material: Cesium.Color.RED,
        },
      })

      // 初始化距离标签
      distanceLabel = viewer.entities.add({
        position: startPosition,
        label: {
          text: '0.00 m',
          font: '14px sans-serif',
          fillColor: Cesium.Color.BLACK,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        },
      })
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  handler.setInputAction((movement) => {
    if (startPosition) {
      const currentMousePosition = viewer.scene.pickPosition(movement.endPosition)

      if (Cesium.defined(currentMousePosition)) {
        // 更新线段的终点
        tempLineEntity.polyline.positions = [startPosition, currentMousePosition]

        // 计算距离
        const distance = computeDistance(startPosition, currentMousePosition)

        // 更新标签位置和文本
        distanceLabel.position = currentMousePosition
        distanceLabel.label.text = `${distance.toFixed(2)} m`
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

  handler.setInputAction(() => {
    if (startPosition) {
      // 停止鼠标事件监听
      handler.destroy()
      handler = null

      // 清空临时状态
      startPosition = null
      tempLineEntity = null
      distanceLabel = null
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
}

const computeDistance = (point1, point2) => {
  const cartographic1 = Cesium.Cartographic.fromCartesian(point1)
  const cartographic2 = Cesium.Cartographic.fromCartesian(point2)

  const geodesic = new Cesium.EllipsoidGeodesic()
  geodesic.setEndPoints(cartographic1, cartographic2)

  return geodesic.surfaceDistance // 返回地表距离（单位：米）
}
