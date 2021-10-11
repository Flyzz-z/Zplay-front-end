import { LiveInfo } from "@/vo/Live";
import { client, Result } from "./axios-http";

export async function getLiveInfo(id: Number): Promise<Result<LiveInfo>> {
    const response = await client.request({
        url: ""+id,
        method: "GET"
    })
    return response.data;
}

