import mockjs from "mockjs";
import { VideoInfo } from "../vo/Video";

const videoTemplate = {
    data : {
        "id": 1,
        "title": "xzz的视频",
        "url": "https://flyzz-videos.oss-cn-beijing.aliyuncs.com/test.flv",
        "createTime": new Date(Date.parse(mockjs.Random.datetime())),
        "barrageNum": 20,
        "duration": 12
    }
}

const danmus: {} = { 
    data : [{
        time: 1,
        type: 0,
        color: 16777215,
        author: "xzz",
        text: "太帅了"
    },
    {
        time: 3.12,
        type: 1,
        color: 16777215,
        author: "xzz",
        text: "恭喜发财"
    }]
}
mockjs.mock("http://127.0.0.1:3000/api/video/1",videoTemplate);
mockjs.mock(RegExp("http://127.0.0.1:3000/danmu"+".*"),danmus);