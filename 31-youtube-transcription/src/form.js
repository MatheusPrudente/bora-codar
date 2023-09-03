import { startLoading, stopLoading, loadingMessage } from "./loading";

import { loadVideo, getVideoId } from "./youtube-api";

import { renderText } from "./render";

import { transcribeAudio } from "./transcribe";

import axios from "axios";

const form = document.querySelector("#form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        loadingMessage("Iniciando a aplicação");
        startLoading();

        const formData = new FormData(form);
        const url = formData.get("url");

        await loadVideo(url);
        const videoId = getVideoId(url);

        loadingMessage("Baixando e convertendo o vídeo");
        await axios.get(`http://localhost:3333/audio?v=${videoId}`);
        const data = await transcribeAudio();
        renderText(data);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        stopLoading();
    }
})