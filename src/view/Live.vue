<template>
  <el-row class="live-wrapper">
    <el-col class="l-col"  :span="14" :offset="2" >
      <live-player ref="getLivePlayer"></live-player>
    </el-col>
    <el-col class="r-col" :span="7" style="background-color:orange">

    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({                                         

})
</script>


<script setup lang="ts">
import { getLiveInfo } from "@/api/request/live-http";
import { LiveInfo } from "@/vo/Live";
import {  onMounted, provide, reactive } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const getLivePlayer = ref();
function loadLive() {
  const route = useRoute();
  const {id} = route.params;
  const liveInfo: LiveInfo = reactive({
    id: 0,
    title: "",
    url: ""
  })

  provide("liveInfo",liveInfo);

  onMounted(()=>{
    getLiveInfo(Number(id)).then((res)=>{
      const data = res.data;
      liveInfo.id = data.id;
      liveInfo.title = data.title;
      liveInfo.url = data.url;
      getLivePlayer.value.loadPlayer(liveInfo);
    })
  })
}
loadLive();
</script>

<style>

</style>