import DPlayer, { DPlayerDanmakuItem } from 'dplayer';
import flvjs from "flv.js"
import { Barrage, DplayerBarrage } from '@/vo/barrage';
import { LiveInfo } from '@/vo/Live';
// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs';
import { Client,Message } from '@stomp/stompjs';
import { nanoid } from 'nanoid'



export function loadLivePlayer(liveInfo: LiveInfo) {

  const stompClient = new Client({
    brokerURL: "ws://localhost:8080/stomp",
    reconnectDelay: 2000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    debug: function (str) {
      console.log(str);
    },
  });
 
  const sign = nanoid();
  

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
        stompClient.onConnect = () => {
          stompClient.subscribe("live" + liveInfo.id, (message) => {
            const barrage: Barrage = JSON.parse(message.body);
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
          options.success();
        };
        stompClient.activate();
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
        stompClient.publish({
          destination: "live"+liveInfo.id,
          body: JSON.stringify(barrage)
        });
        options.success();
      }
    } 
  });

}