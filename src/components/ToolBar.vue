<template>
  <div class="toolbox">
    <el-tooltip effect="customized" content="放大" placement="bottom" :show-arrow="false">
      <img :src="zoomIn" alt="" @click="emitZoomIn" />
    </el-tooltip>
    <el-tooltip effect="customized" content="缩小" placement="bottom" :show-arrow="false">
      <img :src="zoomOut" alt="" @click="emitZoomOut" />
    </el-tooltip>
    <el-tooltip effect="customized" content="复位" placement="bottom" :show-arrow="false">
      <img :src="reset" alt="" @click="emitZoomReset" />
    </el-tooltip>
    <el-tooltip effect="customized" placement="bottom" :show-arrow="false">
      <template #content>
        <div class="toolbar-layers">
          <span @click="emitSwitchBaseMap('img')">影像图</span>
          <span @click="emitSwitchBaseMap('vec')">矢量图</span>
        </div>
      </template>
      <img :src="layer" alt="" />
    </el-tooltip>
    <el-tooltip effect="customized" placement="bottom" :show-arrow="false">
      <template #content>
        <div class="toolbar-measures">
          <span @click="emitMeasure('distance')">测量距离</span>
          <span @click="emitMeasure('area')">测量面积</span>
        </div>
      </template>
      <img :src="measure" alt="" />
    </el-tooltip>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import zoomIn from '@/assets/images/zoomIn.png'
import zoomOut from '@/assets/images/zoomOut.png'
import reset from '@/assets/images/reset.png'
import layer from '@/assets/images/layer.png'
import measure from '@/assets/images/measure.png'
import buildingSwitch from '@/assets/images/buildingSwitch.png'
import tunnelSwitch from '@/assets/images/tunnelSwitch.png'

const emits = defineEmits(['zoomIn', 'zoomOut', 'resetZoom', 'switchBaseMap', 'emitMeasure'])

const emitZoomIn = () => {
  emits('zoomIn')
}
const emitZoomOut = () => {
  emits('zoomOut')
}
const emitZoomReset = () => {
  emits('resetZoom')
}
const emitSwitchBaseMap = (type) => {
  emits('switchBaseMap', type)
}
const emitMeasure = (type) => {
  emits('emitMeasure', type)
}
</script>

<style scoped lang="less">
.toolbox {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 200px;
  height: 38px;
  padding: 5px 0;
  position: absolute;
  top: 10px;
  right: 50%;
  background-color: rgb(5 16 28 / 0.8);
  border-radius: 5px;
}
</style>
