import express from "express";

import cors from "cors";
import { downloader } from "./download-video.js";
import { createMP3 } from "./create-mp3.js";

const app = express();

app.use(cors());

app.get("/audio", async (request, response) => {
    const videoId = request.query.v;

    try {
        await downloader(videoId);
        await createMP3();
        return response.send("Ok");
    }
    catch (error) {
        console.error(error);
        return response.send(error).status()
    }

})

app.listen(3333, () => console.log("HTTP running server at 3333 🚀"));