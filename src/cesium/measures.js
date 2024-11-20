import * as Cesium from 'cesium'

let handler
let positions = [] // 存储点击的点
let distanceLabel // 显示距离的标签

export default function startMeasureDistance(viewer) {
  console.log('measureDistance start')
  handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

  handler.setInputAction((clickEvent) => {
    const earthPosition = viewer.scene.pickPosition(clickEvent.position)

    if (Cesium.defined(earthPosition)) {
      positions.push(earthPosition)

      if (positions.length > 1) {
        // 动态绘制线段
        viewer.entities.add({
          polyline: {
            positions: positions,
            width: 3,
            material: Cesium.Color.RED,
          },
        })

        // 计算并显示距离
        const distance = computeDistance(
          positions[positions.length - 2],
          positions[positions.length - 1],
        )
        showDistanceLabel(viewer, earthPosition, distance)
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  // 双击结束测量
  handler.setInputAction(() => {
    stopMeasure()
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
}

const computeDistance = (point1, point2) => {
  const cartographic1 = Cesium.Cartographic.fromCartesian(point1)
  const cartographic2 = Cesium.Cartographic.fromCartesian(point2)

  const geodesic = new Cesium.EllipsoidGeodesic()
  geodesic.setEndPoints(cartographic1, cartographic2)

  return geodesic.surfaceDistance // 返回地表距离（单位：米）
}

const showDistanceLabel = (viewer, position, distance) => {
  viewer.entities.add({
    position: position,
    label: {
      text: `${(distance / 1000).toFixed(2)} km`, // 显示距离并转换为公里
      font: '14px sans-serif',
      fillColor: Cesium.Color.BLACK,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  })
}

const stopMeasure = () => {
  if (handler) {
    handler.destroy()
    handler = null
  }
  positions = [] // 清空存储点
}
