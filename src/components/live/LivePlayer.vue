<template>
  <div class="live-player-wrapper">
    <div id="live-player"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({

})
</script>


<script setup lang="ts">
import { loadLivePlayer } from '@/api/components/live/LivePlayer';
const loadPlayer = loadLivePlayer;
</script>


<style lang="scss" scoped>
.live-player-wrapper {
  $width: 740px;
  height: $width/1.47;
  #live-player {
    margin-top: 7%;
    height: 80%;
    width: 100%;
  }
}

</style>