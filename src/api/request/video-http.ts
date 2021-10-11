import { Barrage } from "@/vo/barrage";
import { VideoInfo } from "@/vo/Video";
import { client, Result } from "./axios-http";

export  async function getVideoInfo(id: Number): Promise<Result<VideoInfo>> {
    const response = await client.request({
        url: "http://127.0.0.1:3000/api/video/" + id,
        method: "GET"
    });
    return response.data;
}

export async function getBarrages(id: Number): Promise<Result<Array<Barrage>>> {
    const response = await client.request({
        url: "/danmaku/get/"+id,
        method: "GET"
    });
    return response.data;
}

export async function sendBarrage(barrage: Barrage): Promise<Result<any>> {
    const response = await client.request({
        url: "/danmaku/save",
        method: "POST",
        data: barrage
    });
    return response.data;
}