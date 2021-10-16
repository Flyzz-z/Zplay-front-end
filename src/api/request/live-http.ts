import { LiveInfo } from "@/vo/Live";
import { client, Result } from "./axios-http";

export async function getLiveInfo(id: Number): Promise<Result<LiveInfo>> {
    const response = await client.request({
        url: "http://127.0.0.1:3000/api/live/"+id,
        method: "GET"
    })
    return response.data;
}

export async function getSign(): Promise<Result<string>> {
    const response = await client.request({
        url: "/danmaku/sign",
        method: "GET"
    })
    return response.data;
}

