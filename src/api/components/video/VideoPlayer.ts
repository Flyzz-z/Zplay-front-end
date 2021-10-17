import { VideoInfo } from '@/vo/Video';
import DPlayer from 'dplayer';
import flvjs from "flv.js"
import { getBarrages, sendBarrage } from '@/api/request/video-http';
import { Barrage, DplayerBarrage } from '@/vo/barrage';

export function loadVideoPlayer(videoInfo: VideoInfo) {
  const dp = new DPlayer({
    container: document.getElementById("video-player"),
    video: {
      url: videoInfo.url,
      type: "customFlv",
      customType: {
        customFlv: function (video: HTMLMediaElement, player: any) {
            const flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: video.src,
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
        },
      },
    },
    danmaku: {
      id: String(videoInfo.id),
      api: "http://127.0.0.1:3000/danmu",
    },
    apiBackend: {
      read: (options)=> {
        getBarrages(videoInfo.id).then((res)=>{
          const danmus: Array<DplayerBarrage> = res.data.map(item=>{
            return {
                  type: item.barrageType,
                  time: item.time,
                  color: item.color,
                  text: item.content,
                  author: item.author
            }
          })
          options.success(danmus);
          console.log(danmus);
        }).catch((e)=>{
          console.error(e);
          options.error && options.error();
        })
      },
      send: (options)=>{
        const danmu = options.data;
        const barrage: Barrage = {
          barrageType: danmu.type,
          content: danmu.text,
          time: danmu.time,
          color: danmu.color,
          author: danmu.author,
          videoId: danmu.id
        }
        sendBarrage(barrage).then((res)=>{
          options.success && options.success(res.data)
        }).catch((e)=>{
          console.error(e);
          options.error && options.error();
        })
      }
    }
  });
}
