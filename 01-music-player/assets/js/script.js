const appColection = document.querySelector("#app-collection");
const appMusic = document.querySelector("#app-music");

loadMusicCollection();

function loadMusicCollection() {
  const musics = [new Music("Acorda Pedrinho","Jovem Dionisio","./assets/music/acorda-pedrinho.png","./assets/music/acorda-pedrinho.mp3"),
                  new Music("Acorda Pedrinho2","Jovem Dionisio","","./assets/music/acorda-pedrinho.mp3"),
                  new Music("Acorda Pedrinho3","Jovem Dionisio","","./assets/music/acorda-pedrinho.mp3")];

  let options = [new Option("player-one",["player", "selectable"],"vertical",true,true,true),
                new Option("player-two",["player","selectable","horizontal"],"horizontal",true,true,true),
                new Option("player-three",["player","selectable","horizontal"],"horizontal",true,false,true)]

  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    const music = musics[index];
    appColection.innerHTML += createCard(option, music);
  }
}

function switchToMusicPlayer() {
  appColection.classList.remove("active");
  appColection.classList.add("hidden");
  appMusic.classList.add("active");
  appMusic.classList.remove("hidden");
  createCardPlayer();
}

function switchToMusicCollection() {
  appMusic.classList.remove("active");
  appColection.classList.add("hidden");
  appColection.classList.add("active");
  appMusic.classList.remove("hidden");
}