import ytdl from "ytdl-core";
import fs from "node:fs";

export const downloader = (videoId) => new Promise((resolve, reject) => {
    const videoURL = `https://youtube.com/watch?v=${videoId}`;

    ytdl(videoURL, {
        quality: "lowestaudio",
        filter: "audioonly"
    })
    .on("end", () => resolve())
    .on("error", () => reject("ERROR_DOWNLOADING_VIDEO"))
    .pipe(fs.createWriteStream("audio.mp4"))
})