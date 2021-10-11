import { onMounted, provide, reactive } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { getVideoInfo} from "../request/video-http";
import { VideoInfo } from '@/vo/Video';
function loadVideo(getVideoPlayer: any) {
  const route = useRoute();
  const {id} = route.params;
  const videoInfo: VideoInfo = reactive({
      id: 0,
      title: "",
      url: "",
      createTime: new Date(),
      barrageNum: 0,
      duration: 0
  });

  provide("videoInfo",videoInfo);
//获得播放器子组件

  //获得响应，并改变provide
  onMounted(()=>{
    getVideoInfo(Number(id)).then((res)=>{
    const data = res.data;
    videoInfo.id = data.id;
    videoInfo.title = data.title;
    videoInfo.url = data.url;
    videoInfo.createTime = data.createTime;
    videoInfo.barrageNum = data.barrageNum;
    videoInfo.duration = data.duration;
    getVideoPlayer.value.loadPlayer(videoInfo);
  })
  });
}
export default loadVideo;