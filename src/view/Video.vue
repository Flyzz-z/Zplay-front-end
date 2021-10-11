<template>
  <el-row class="video-wrapper">
    <el-col class="l-col"  :span="14" :offset="2" >
      <video-player ref="getVideoPlayer"></video-player>
    </el-col>
    <el-col class="r-col" :span="7" style="background-color:orange">

    </el-col>
  </el-row>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import loadVideo from '@/api/video/loadVideo';
const getVideoPlayer = ref();
loadVideo(getVideoPlayer);

</script>


<style lang="scss" scoped>
.video-wrapper{
  .l-col{
    margin-right: 28px;
    min-width: 580px;
    max-width: 623px;
  }
}
</style>