export interface Barrage {
    id?: Number,
    barrageType: Number,
    time: Number,
    color: Number,
    content: string,
    author: string,
    videoId: Number,
    createTime?: Date,
    sign?: string
}

export interface DplayerBarrage {
    type: Number,
    time: Number,
    color: Number,
    text: string,
    author: string
}