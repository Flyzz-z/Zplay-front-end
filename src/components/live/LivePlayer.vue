<template>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>


<script setup lang="ts">
import { VideoInfo } from '@/vo/Video';
import DPlayer from 'dplayer';
import flvjs from "flv.js"
import { Barrage, DplayerBarrage } from '@/vo/barrage';
import { LiveInfo } from '@/vo/Live';

function loadPlayer(liveInfo: LiveInfo) {
  const dp = new DPlayer({
    container: document.getElementById("video-player"),
    live: true,
    video: {
      url: liveInfo.url,
      type: "customFlv",
      customType: {
        customFlv: function (video: HTMLMediaElement, player: any) {
            const flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: video.src,
                isLive: true
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
        },
      },
    },
    apiBackend: {
      read: (options)=> {

      },
      send: (options)=>{

        }
    }
  });
}

</script>


<style>

</style>