<template>
  <div class="overflow-hidden boxWrap rounded-xl bg-[#05101C]/80">
    <div class="card-list">
      <div
        v-for="(item, index) in cardList"
        :key="item.id"
        class="relative cursor-pointe card-item"
        :id="item.name"
        @click="cardClick(item.id, item.name, item.color)"
        :class="{ active: curClickCard === item.id }"
        :style="curClickCard === item.id ? { color: item.color } : {}"
      >
        <span class="count">{{ item.count }}</span>
        <span class="text">{{ item.text }}</span>
        <img :src="item.imgSrc" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import redWarning from '@/assets/images/redWarning.png'
import orangeWarning from '@/assets/images/orangeWarning.png'
import yellowWarning from '@/assets/images/yellowWarning.png'
import greenNormal from '@/assets/images/greenNormal.png'
import normalImg from '/texture/map_normal.png'

import { bearerToken } from '@/config/constants'
import * as Cesium from 'cesium'
import { useMapStore } from '@/stores/map'

const mapStore = useMapStore()

const cardList = ref([
  { id: 1, name: 'card1', imgSrc: redWarning, color: '#FF7474', text: '超限告警', count: 0 },
  { id: 2, name: 'card2', imgSrc: orangeWarning, color: '#ff5a00', text: '水位预警', count: 0 },
  { id: 3, name: 'card3', imgSrc: yellowWarning, color: '#ff8a00', text: '上报告警', count: 0 },
  { id: 4, name: 'card4', imgSrc: greenNormal, color: '#99FF94', text: '正常', count: 0 },
])

const curClickCard = ref(-1)
const activeColor = ref()

const stationList = ref([])
const normStations = ref([])
let normalEntities = []

// 获取不同告警信息的数量
async function getAlarmTotal() {
  const res = await fetch('http://localhost:3004/proxy/tunnel/statusCount', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken,
    },
  })
  const data = await res.json()
  // console.log(data.data)

  const { limitAlarm, normal, reportAlarm, waterLevelWarn } = data.data
  const tmp = [limitAlarm, waterLevelWarn, reportAlarm, normal]

  cardList.value.forEach((item, index) => {
    item.count = tmp[index]
  })
  // console.log(cardList.value)
}

// 获取所有站点信息
async function getStationList() {
  const res = await fetch('http://localhost:3004/proxy/station/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken,
    },
    body: JSON.stringify({
      typeId: 2,
    }),
  })
  const data = await res.json()
  console.log(data)
  stationList.value = data.data
  normStations.value = stationList.value.filter((item) => {
    return item.statusSec === 0
  })
}
// 把指定的站点信息添加到地图上
function addPoints(limitAlarmArr, viewer) {
  if (limitAlarmArr.length === 0) return
  limitAlarmArr.forEach((item) => {
    if (item.lon && item.lat) {
      let normalEntity = viewer.entities.add({
        id: 'normal_' + item.id,
        name: item.name,
        statusSec: 0,
        position: Cesium.Cartesian3.fromDegrees(Number(item.lon), Number(item.lat), 0),
        pointPosition: [Number(item.lon), Number(item.lat)],
        billboard: {
          image: normalImg,
          width: 40,
          height: 51,
          // 设置广告牌的显示位置
          verticalOrigin: Cesium.VerticalOrigin.TOP,
          // 设置广告牌的显示位置
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          // 贴地
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          // 从相机到禁用深度测试的距离
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
      })
      normalEntities.push(normalEntity)
    }
  })
}
// card的点击事件
const cardClick = (id, name, color) => {
  if (curClickCard.value === id) {
    curClickCard.value = -1
    return
  }
  curClickCard.value = id
  activeColor.value = color
}

// 主函数
async function main() {
  await getAlarmTotal()
  await getStationList()
  addPoints(normStations.value, mapStore.viewer)
  if (mapStore.viewer) {
    mapStore.viewer.flyTo(normalEntities, {
      offset: new Cesium.HeadingPitchRange(
        0.0, // 0度，朝向正北
        -Cesium.Math.PI_OVER_TWO, // -90度，俯视角
      ),
    })
  }
}
main()
</script>

<style scoped>
.boxWrap {
  width: 340px;
  height: 31%;
  position: absolute;
  z-index: 50;
  top: 10px;
  left: 10px;
  display: block;
}

.card-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.card-list .card-item {
  position: relative;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s;
}
.card-list .card-item.active {
  transform: scale(1.2);
  color: var(activeColor);
}
.card-list .card-item .count {
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 28px;
}

.card-list .card-item .text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card-list .card-item img {
  width: 130px;
  height: 100px;
}
</style>
