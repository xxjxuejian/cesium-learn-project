import { defineStore } from 'pinia'
import { ref } from 'vue'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useMapStore = defineStore('mapStore', () => {
  // const bearerToken =
  //   'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImNlMjM5OWFmLTBiMGMtNDFiNC1iZTZmLWM0Yjc4MzUzYjM1ZiJ9.lgkEPJioSxfC1pOVPiRcymVZ1VrLTZuTAPwKGbdioWap18ozVTd0IykH2W65uigXqfSIOn-dcrA3gDXq72LJ8Q'
  const viewer = ref(null)
  // const stationList = ref([])
  // const normStations = ref([])
  const setViewer = (value) => {
    viewer.value = value
  }

  // async function getStationList() {
  //   const res = await fetch('http://localhost:3004/proxy/station/list', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: bearerToken,
  //     },
  //     body: JSON.stringify({
  //       typeId: 2,
  //     }),
  //   })
  //   const data = await res.json()
  //   console.log(data)
  //   stationList.value = data.data
  //   normStations.value = stationList.value.filter((item) => {
  //     return item.statusSec === 0
  //   })
  // }
  return {
    viewer,
    // stationList,
    // normStations,
    setViewer,
    // getStationList,
  }
})
