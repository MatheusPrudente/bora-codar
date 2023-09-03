const player = document.querySelector("#player-one");
const step = 5;
let mouseStillDown = false;
let selectMusic;

function createCard(options, music) {
  console.log("OPTIONS", options);
  console.log("MUSIC", music);

  let card =
  `<div id="${options.id}" class="${options.classNames.join(" ")}">
    <div class="wrapper">
      <img loading="lazy" src="${music.thumbnail || "./assets/images/default.png"}" alt="Capa do Musica - ${music.name} - ${music.band}">
      <div class="info">
        <h1>${music.band}</h1>
        <p>${music.name}</p>
      </div>
      <div class="track-time">
        <div class="track"></div>
        <div class="time">
          <div class="total-time">03:20</div>
          <div class="last-time">00:12</div>
        </div>
      </div>
      <div class="controls">
        <div class="prev"><img src="./assets/images/prev.svg"></div>
        <div class="play"><img src="./assets/images/play.svg"></div>
        <div class="next"><img src="./assets/images/next.svg"></div>
      </div>
    </div>
  </div>`;
  return card;
}

function createControls() {
  let controls = document.createElement("div");
  controls.classList.add("controls");

  let next = document.createElement("div");
  next.classList.add("next");
  let nextImg = document.createElement("img");
  nextImg.src = "./assets/images/next.svg";
  next.appendChild(nextImg);

  let play = document.createElement("div");
  play.classList.add("play");
  let playImg = document.createElement("img");
  playImg.src = "./assets/images/play.svg";
  play.appendChild(playImg);

  let prev = document.createElement("div");
  prev.classList.add("prev");
  let prevImg = document.createElement("img");
  prevImg.src = "./assets/images/prev.svg";
  prev.appendChild(prevImg);

  controls.appendChild(prev);
  controls.appendChild(play);
  controls.appendChild(next);

  return controls;
}

function createTrackTime() {
  let trackTime = document.createElement("div");
  trackTime.classList.add("track-time");

  let track = document.createElement("div");
  track.classList.add("track");

  let time = document.createElement("div");
  time.classList.add("time");

  let totalTime = document.createElement("div");
  totalTime.classList.add("total-time");
  totalTime.textContent = "03:20";

  let lastTime = document.createElement("div");
  lastTime.classList.add("last-time");
  lastTime.textContent = "00:12";

  time.appendChild(totalTime);
  time.appendChild(lastTime);

  trackTime.appendChild(track);
  trackTime.appendChild(time);

  return trackTime;
}

function createInformation(music) {
  let info = document.createElement("div");
  info.classList.add("info");

  let musicName = document.createElement("h1");
  musicName.textContent = music.name;
  let musicBand = document.createElement("p");
  musicBand.textContent = music.band;

  info.appendChild(musicName);
  info.appendChild(musicBand);

  return info;
}

function createCardPlayer() {
  let option = new Option("player-one",["player", "selectable"],"vertical",true,true,true);
  let t = createCard(option, selectMusic);

  player.style.display = "flex";

  let thumbnail = player.querySelector(".thumbnail");
  thumbnail.src = selectMusic.thumbnail ? selectMusic.thumbnail : "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  // name and band
  let info = player.querySelector(".info");
  info.querySelector("h1").innerHTML = selectMusic.name;
  info.querySelector("p").innerHTML = selectMusic.band;

  let controls = player.querySelector(".controls");
  let play = controls.querySelector(".play");

  play.addEventListener("click",() => {
    isPlayingMusic();
  });

  let next = controls.querySelector(".next");
  next.addEventListener("mousedown",() => {
    mouseStillDown = true;
    incrementStep();
  });
  next.addEventListener("mouseup",() => {
    mouseStillDown = false;
    clearAllIntervals();
  });

  let prev = controls.querySelector(".prev");
  prev.addEventListener("mousedown",() => {
    mouseStillDown = true;
    decrementStep();
  });

  prev.addEventListener("mouseup",() => {
    mouseStillDown = false;
    clearAllIntervals();
  });

  // metadata
  let audio = player.querySelector("audio");
  audio.setAttribute('id',`music-metadata-${selectMusic.id}`);
  audio.src = selectMusic.url;
  audio.addEventListener("loadedmetadata", () => {
    loadMetaData()
  });
  audio.addEventListener("timeupdate",() =>  {
    updateTime()
  });

  let track = player.querySelector(".track-time input[type='range']");
  track.setAttribute("id",`seek-slider-${selectMusic.id}`);
  track.addEventListener("change", (event) => {
    updateAudio(event);
  });
  track.addEventListener("input", (event) => {
    selectedTime(event);
  });
}

function isPlayingMusic() {
  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
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
  }
}

function calculateTime(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

function displayDuration(duration) {
  const durationContainer = player.querySelector(".track-time .time .total-time");
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
  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
  const seekSlider = document.getElementById(`seek-slider-${selectMusic.id}`);
  const currentTime = player.querySelector(".track-time .time .last-time");
  seekSlider.value = (Math.floor(audio.currentTime)).toString();
  currentTime.textContent = calculateTime(Number.parseInt(seekSlider.value));
}

function loadMetaData() {
  const audio = document.querySelector(`#music-metadata-${selectMusic.id}`);
  displayDuration(audio.duration);
  setSliderMax(audio.duration);
}

function selectedTime(event) {
  const seekSlider = (event.target || event.currentTarget);
  const currentTime = player.querySelector(".track-time .time .last-time");
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
  }
  setInterval("incrementStep()", 500);
};

function clearAllIntervals() {
  const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
}