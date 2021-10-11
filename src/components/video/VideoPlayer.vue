<template>
  <div class="video-player-wrapper">
    <div id="video-player"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<script setup lang="ts">
import load from '@/api/videoPlayer/loadPlayer';
const loadPlayer = load;
</script>

<style lang="scss" scoped>
.video-player-wrapper{
  $width: 740px;
  height: $width/1.47;
  //background-color: black;
  #video-player{
    margin-top: 7%;
    height: 80%;
    width: 100%;
  }
}
</style>