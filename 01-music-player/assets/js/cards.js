function createCards(options, music) {
  //horizontal and vertical
  let card = document.createElement("div");
  card.setAttribute('id',options.id);

  options.classNames.forEach((className)=> {
    card.classList.add(className);
  });

  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  let thumbnail = document.createElement("img");
  thumbnail.loading = "lazy";
  thumbnail.src = "https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  thumbnail.alt = "Capa do cd Rockeseat - Single - Acorda Devinho";

  if(options.orientation == "horizontal") {
    let infoWrapper = document.createElement("div");
    infoWrapper.classList.add("info-wrapper");
    infoWrapper.appendChild(thumbnail);

    if(options.show.information) {
      infoWrapper.appendChild(createInformation(music));
    }
    wrapper.appendChild(infoWrapper);
  } else {
    wrapper.appendChild(thumbnail);

    if(options.show.information) {
      wrapper.appendChild(createInformation(music));
    }
  }

  if(options.show.trackTime) {
    wrapper.appendChild(createTrackTime());
  }

  if(options.show.controls) {
    wrapper.appendChild(createControls());
  }

  card.appendChild(wrapper);
  card.addEventListener("click",() => {
    selectMusic = music;
    if(selectMusic) {
      switchToMusicPlayer();
    }
  });
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