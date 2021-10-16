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
import DPlayer, { DPlayerDanmakuItem } from 'dplayer';
import flvjs from "flv.js"
import { Barrage, DplayerBarrage } from '@/vo/barrage';
import { LiveInfo } from '@/vo/Live';
// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs';
import webstomp from 'webstomp-client';
import { nanoid } from 'nanoid'



function loadPlayer(liveInfo: LiveInfo) {

  const socket = new SockJS("http://127.0.0.1:8080/connect");
  const stompClient = webstomp.over(socket);
  const sign = nanoid()


  const dp = new DPlayer({
    container: document.getElementById("live-player"),
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
          },{
            autoCleanupSourceBuffer: true
          });
          flvPlayer.attachMediaElement(video);
          flvPlayer.load();
        },
      },
    },
    danmaku: {
      id: String(liveInfo.id),
      api: "live",
      user: "xzz"
    },
    apiBackend: {
      read: (options) => {
        stompClient.connect({}, () => {
          stompClient.subscribe("/topic/live/" + liveInfo.id, (frame) => {
            const barrage: Barrage = JSON.parse(frame.body);
            if(barrage.sign == sign) return;
            const dan = {
              type: barrage.barrageType,
              color: barrage.color,
              text: barrage.content,
              time: barrage.time,
              author: barrage.author
            }
            dp.danmaku.draw((dan as any) as DPlayerDanmakuItem);
          });
        })
        options.success();
      },
      send: (options) => {
        const danmu = options.data;
        const barrage: Barrage = {
          barrageType: danmu.type,
          content: danmu.text,
          time: dp.video.currentTime,
          color: danmu.color,
          author: "xzz",
          videoId: liveInfo.id,
          sign: sign
        }
        stompClient.send("/live/send/"+liveInfo.id,JSON.stringify(barrage),{sign: sign});
        options.success();
      }
    }
  });

}


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