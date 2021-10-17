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
import { loadLive } from '@/api/view/Live';
const getLivePlayer = ref();
loadLive(getLivePlayer);
</script>

<style>

</style>