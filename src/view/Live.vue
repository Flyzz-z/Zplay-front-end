<template>
  <el-row class="live-wrapper">
    <el-col class="l-col"  :span="14" :offset="2" >
      <video-player ref="getLivePlayer"></video-player>
    </el-col>
    <el-col class="r-col" :span="7" style="background-color:orange">

    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { LiveInfo } from "@/vo/Live";
import { useRoute } from "vue-router";


function loadLive() {
  const route = useRoute();
  const {id} = route.params;
  const liveInfo: LiveInfo = {
    id: 0,
    title: "",
    url: ""
  }
  
}
</script>

<style>

</style>