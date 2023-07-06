const appColection = document.querySelector("#app-collection");
const appMusic = document.querySelector("#app-music");
const player = appMusic.querySelector("#player-one");
const step = 5;
let mouseStillDown = false;
let selectMusic;
loadMusicCollection();

function loadMusicCollection() {
  const musics = [new Music("Acorda Pedrinho","Jovem Dionisio","./assets/music/acorda-pedrinho.mp3"),
                  new Music("Acorda Pedrinho2","Jovem Dionisio","./assets/music/acorda-pedrinho.mp3"),
                  new Music("Acorda Pedrinho3","Jovem Dionisio","./assets/music/acorda-pedrinho.mp3")];

  let options = [new Option("player-one",["player"],"vertical",true,true,true),
                new Option("player-two",["player","horizontal"],"horizontal",true,true,true),
                new Option("player-three",["player","horizontal"],"horizontal",true,false,true)]

  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    const music = musics[index];
    appColection.append(createCards(option, music));
  }
}

function switchToMusicPlayer() {
  appColection.classList.remove("active");
  appColection.classList.add("hidden");
  appMusic.classList.add("active");
  appMusic.classList.remove("hidden");
  loadMusicPlayer();
}

function switchToMusicCollection() {
  appMusic.classList.remove("active");
  appColection.classList.add("hidden");
  appColection.classList.add("active");
  appMusic.classList.remove("hidden");
}

function loadMusicPlayer() {
  player.style.display = "flex";

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