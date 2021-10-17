import { getLiveInfo } from "@/api/request/live-http";
import { LiveInfo } from "@/vo/Live";
import {  onMounted, provide, reactive } from "@vue/runtime-core";
import { useRoute } from "vue-router";

export function loadLive(getLivePlayer: any) {
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