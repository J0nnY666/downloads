import { useState } from "react";
import ShowVisible from "./showVisible";
import { twitchDownload } from "@/core/twitchDownload";
import { iTwitchDownload } from "@/interfaces/twitchDownloadr.interface";
import youtubeApiRequest from "@/core/youtubeApiRequest";
import twitterApiRequest from "@/core/twitterApiRequest";

export default function Download() {

    const [url, setUrl] = useState("");
    const [downloadInfo, setDownloadInfo] = useState({
        download: "",
        title: "",
        thumb: "",
        views: 0,
        channel: "",
        youtube: false,
        twitter: false,
        channelLink: "",
        originalLink: "",
    });

    const { showDownloadCard, showForm, visibleDownloadCard, visibleForm } = ShowVisible()

    async function handleUrl(url: string) {
        if (url.length === 0) {
            alert('Campo url não pode ser vázio')
            return
        } else {
            if (url.includes('twitch')) {
                try {
                    await twitchDl(url)
                    showDownloadCard()
                    _setUrl('')
                } catch (err: any) {
                    alert(`Erro ao realizar o download: ${err.message}`);
                }
            } else if (url.includes('youtube')) {
                try {
                    await youtubeDl(url)
                    showDownloadCard()
                    _setUrl('')
                } catch (err: any) {
                    alert(`Erro ao realizar o download: ${err.message}`);
                }
            } else if (url.includes('twitter')) {
                try {
                    await twitterDl(url)
                    showDownloadCard()
                    _setUrl('')
                } catch (err: any) {
                    alert(`Erro ao realizar o download: ${err.message}`);
                }
            }
            else {
                alert(`URL INVÁLIDA`);
            }
        }
    }

    async function twitchDl(url: string) {
        const res: iTwitchDownload = await twitchDownload(url)
        setDownloadInfo({
            channel: res.channel,
            download: res.download,
            thumb: res.thumb,
            title: res.title,
            views: res.views,
            youtube: false,
            twitter: false,
            channelLink: `https://www.twitch.tv/${res.channel}`,
            originalLink: url,
        })
    }

    async function youtubeDl(url: string) {
        const { title, downloadUrl, ownerChannelName, thumbnails, viewCount, channelUrl } = await youtubeApiRequest(url)
        const downloadLinks: any = {};
        for (const format of downloadUrl) {
            downloadLinks[format.quality] = format.url;
        }
        setDownloadInfo({
            channel: ownerChannelName,
            download: downloadLinks,
            thumb: thumbnails,
            title: title,
            views: +viewCount,
            youtube: true,
            twitter: false,
            channelLink: channelUrl,
            originalLink: url,
        })
    }

    async function twitterDl(url: string) {
        const res = await twitterApiRequest(url)
        const { download, favorite_count, reply_count } = res
        setDownloadInfo({
            channel: String(reply_count),
            download: download,
            thumb: download,
            title: 'Twitter Video',
            views: favorite_count,
            youtube: false,
            twitter: true,
            channelLink: '',
            originalLink: url,
        })
    }

    function _setUrl(url: string) {
        setUrl(url)
    }

    function getUrl() {
        return url
    }

    function getRes() {
        return downloadInfo
    }

    return {
        getUrl,
        _setUrl,
        handleUrl,
        showForm,
        getRes,
        visibleDownloadCard,
        visibleForm,
    }
}