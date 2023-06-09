import { iYoutubeResponse } from "@/pages/api/interface/youtubeResponse";
import axios from "axios";

export default async function youtubeApiRequest(url: string): Promise<iYoutubeResponse> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_YOUTUBE_API}?yurl=${url}`)
        const { downloadUrl, ownerChannelName, title, viewCount, videoId, channelUrl } = response.data.response
        return {
            downloadUrl: downloadUrl,
            ownerChannelName: ownerChannelName,
            title: title,
            videoId: videoId,
            viewCount: viewCount,
            channelUrl: channelUrl
        }
    } catch (err: any) {
        if (err.response.data.error === 'O vídeo não pode ser maior que 35 minutos') {
            throw new Error(err.response.data.error)
        } else {
            console.error(err);
            throw new Error(`${err}`);
        }
    }
}