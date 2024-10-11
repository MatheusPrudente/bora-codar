const appColection = document.querySelector("#app-collection");
const appMusic = document.querySelector("#app-music");
const musics = [new Music("Glimpse Of Us","Joji","./assets/music/glimpse_of_us.jpg","./assets/music/glimpse_of_us.mp3","03:24","03:53"),
  new Music("No Time To Die","Billie Eilish","./assets/music/no_time_to_die.jpg","./assets/music/no_time_to_die.mp3","03:20","04:03"),
  new Music("Die For You","The Weeknd","./assets/music/die_for_you.jpg","./assets/music/die_for_you.mp3","03:46","04:20")];
const step = 5;
let mouseStillDown = false;
let selectMusic;

loadMusicCollection();

function loadMusicCollection() {
  let options = [new Option("player-one",["player", "selectable"],"vertical",{information : true,trackTime:true,controls:true}),
                new Option("player-two",["player","selectable","horizontal"],"horizontal",{information : true,trackTime:true,controls:true}),
                new Option("player-three",["player","selectable","horizontal"],"horizontal", {information : true,trackTime:false,controls:true}
                )]

  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    const music = musics[index];
    appColection.innerHTML += createCard(option, music);
  }
}

function switchToMusicPlayer(selectId) {
  selectMusic = musics.find((m) => m.id == selectId);
  appColection.classList.remove("active");
  appColection.classList.add("hidden");
  appMusic.classList.add("active");
  appMusic.classList.remove("hidden");
  appMusic.innerHTML = createCardPlayer(selectMusic);
}

function switchToMusicCollection() {
  stopPlayingMusic();
  selectMusic = null;
  appMusic.innerHTML = "";
  appMusic.classList.remove("active");
  appMusic.classList.add("hidden");
  appColection.classList.add("active");
  appColection.classList.remove("hidden");
}

function createCard(options, music) {
  let information = "";
  let trackTime = "";
  let controls = "";

  if(options.show.information) {
    information = `
      <img loading="lazy" src="${music.thumbnail || "./assets/images/default.png"}" alt="Capa do Musica - ${music.name} - ${music.band}">
      <div class="info">
        <h1>${music.name}</h1>
        <p>${music.band}</p>
      </div>
    `;

    if(options.classNames.includes("horizontal")) {
      information = `
        <div class="info-wrapper">
          <img loading="lazy" src="${music.thumbnail || "./assets/images/default.png"}" alt="Capa do Musica - ${music.name} - ${music.band}">
          <div class="info">
            <h1>${music.name}</h1>
            <p>${music.band}</p>
          </div>
        </div>
      `;
    }
  }

  if(options.show.trackTime) {
    trackTime = `
      <div class="track-time">
        <div class="track"></div>
        <div class="time">
          <div class="last-time">${music.currentTime}</div>
          <div class="total-time">${music.duration}</div>
        </div>
      </div>
    `;
  }

  if(options.show.controls) {
    controls = `
      <div class="controls">
        <div class="prev"><img src="./assets/images/prev.svg"></div>
        <div class="play"><img src="./assets/images/play.svg"></div>
        <div class="next"><img src="./assets/images/next.svg"></div>
      </div>
    `;
  }

  let card =
  `<div id="${options.id}" class="${options.classNames.join(" ")}" onClick="switchToMusicPlayer('${music.id}')">
    <div class="wrapper">
      ${information}
      ${trackTime}
      ${controls}
    </div>
  </div>`;
  return card;
}

function createCardPlayer(music) {
  selectMusic = music;
  let thumbnail = selectMusic.thumbnail ? selectMusic.thumbnail : "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";
  return `
    <button type="button" class="close-btn" onclick="switchToMusicCollection()"><img class="selectable-img" src="./assets/images/close.svg"/></button>
    <div id="player-one" class="player card-player-${selectMusic.id}" data-playing="false">
      <div class="wrapper">
        <img class="thumbnail" loading="lazy" src="${thumbnail}" alt="Capa do musica">
        <audio preload="metadata" id="music-metadata-${selectMusic.id}" src="${selectMusic.url}" ontimeupdate="updateTime();" onloadedmetadata="loadMetaData();"></audio>
        <div class="info">
          <h1>${selectMusic.name}</h1>
          <p>${selectMusic.band}</p>
        </div>
        <div class="track-time-${selectMusic.id}">
          <input max="100" value="0" type="range" class="track-range" id="seek-slider-${selectMusic.id}" oninput="selectedTime(event);" onchange="updateAudio(event);">
          <div class="time">
            <div class="last-time">00:00</div>
            <div class="total-time">${selectMusic.duration}</div>
          </div>
        </div>
        <div class="controls">
          <div class="prev selectable-img" onmousedown="previousMouseDown();" onmouseup="previousMouseUp();">
            <img src="./assets/images/prev.svg" alt="">
          </div>
          <div class="play selectable-img" onclick="isPlayingMusic();">
            <img src="./assets/images/play.svg" alt="">
          </div>
          <div class="next selectable-img" onmousedown="nextMouseDown();" onmouseup="nextMouseUp();">
            <img src="./assets/images/next.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  `;
}

function nextMouseDown() {
  mouseStillDown = true;
  incrementStep();
}

function nextMouseUp() {
  mouseStillDown = false;
  clearAllIntervals();
}

function previousMouseDown() {
  mouseStillDown = true;
  decrementStep();
}

function previousMouseUp() {
  mouseStillDown = false;
  clearAllIntervals();
}

function isPlayingMusic() {
  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
  const player = document.querySelector(`.card-player-${selectMusic.id}`);
  let controls = player.querySelector(".controls");
  let playControl = controls.querySelector(".play img");
  let isPlaying = player.dataset.playing == "true";
  if (isPlaying) {
    player.dataset.playing = "false";
    audio.pause();
    playControl.src = "./assets/images/play.svg";
  } else {
    player.dataset.playing = "true";
    audio.play();
    playControl.src = "./assets/images/pause.svg";

    if(audio.currentTime == audio.duration) {
      restartMusic();
    }
  }
}

function calculateTime(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMinutes}:${returnedSeconds}`;
}

function displayDuration(duration) {
  const player = document.querySelector(`.card-player-${selectMusic.id}`);
  const durationContainer = player.querySelector(`.track-time-${selectMusic.id} .time .total-time`);
  durationContainer.textContent = calculateTime(duration);
}

function setSliderMax(duration) {
  const seekSlider = document.getElementById(`seek-slider-${selectMusic.id}`);
  seekSlider.max = Math.floor(duration).toString();
}

function updateAudio(event) {
  const seekSlider = (event.target || event.currentTarget);
  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
  audio.currentTime = Number.parseInt(seekSlider.value);
};

function updateTime() {
  const player = document.querySelector(`.card-player-${selectMusic.id}`);
  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
  let seekSlider = document.getElementById(`seek-slider-${selectMusic.id}`);
  let currentTime = player.querySelector(`.track-time-${selectMusic.id} .time .last-time`);
  seekSlider.value = (Math.floor(audio.currentTime)).toString();
  currentTime.textContent = calculateTime(Number.parseInt(seekSlider.value));

  if(audio.currentTime == audio.duration) {
    stopPlayingMusic();
  }
}

function loadMetaData() {
  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
  displayDuration(audio.duration);
  setSliderMax(audio.duration);
}

function selectedTime(event) {
  const player = document.querySelector(`.card-player-${selectMusic.id}`);
  const seekSlider = (event.target || event.currentTarget);
  const currentTime = player.querySelector(`.track-time-${selectMusic.id} .time .last-time`);
  currentTime.textContent = calculateTime(Number.parseInt(seekSlider.value));
}

function decrementStep() {
  if(!mouseStillDown) {
    return ;
  }

  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
  audio.currentTime -= step;
  updateTime();
  setInterval("decrementStep()", 500);
};

//onmousedown
function incrementStep() {

  if(!mouseStillDown) {
    return ;
  }

  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
  if (audio.currentTime + step < audio.duration) {
    audio.currentTime += step;
    updateTime();
  } else {
    audio.currentTime = audio.duration;
    stopPlayingMusic();
  }
  setInterval("incrementStep()", 500);
};

function clearAllIntervals() {
  const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
}

function stopPlayingMusic() {
  const player = document.querySelector(`.card-player-${selectMusic.id}`);
  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
  let controls = player.querySelector(".controls");
  let playControl = controls.querySelector(".play img");
  player.dataset.playing = "false";
  audio.pause();
  playControl.src = "./assets/images/play.svg";
}

function restartMusic() {
  audio.currentTime = 0;
  let seekSlider = document.getElementById(`seek-slider-${selectMusic.id}`);
  let currentTime = document.querySelector(`.track-time-${selectMusic.id} .time .last-time`);
  seekSlider.value = (Math.floor(audio.currentTime)).toString();
  currentTime.textContent = calculateTime(Number.parseInt(seekSlider.value));
}