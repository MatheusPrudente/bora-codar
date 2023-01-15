import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import { Music } from 'src/models/music';

@Component({
  selector: 'app-card-music',
  templateUrl: './card-music.component.html'
})

export class CardMusicComponent {
  @Input() showStatusBar: boolean = false;
  @Input() showControls: boolean = false;
  @Input() music : Music = new Music;
  isPlaying : boolean = false;

  constructor() { }

  isPlayingMusic() {
    const audio = <HTMLAudioElement> document.querySelector(`#music-metadata-${this.music.id}`);
    if (this.isPlaying) {
      this.isPlaying = false;
      audio?.pause();
    } else {
      this.isPlaying = true;
      audio?.play();
    }
  }

  calculateTime(duration : number) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  }

  displayDuration (duration : number) {
    const durationContainer = document.querySelector(`#duration-${this.music.id}`);
    durationContainer!.textContent = this.calculateTime(duration);
    console.log(durationContainer!.textContent);
  }

  setSliderMax(duration : number) {
    const seekSlider = <HTMLInputElement> document.getElementById(`seek-slider-${this.music.id}`);
    seekSlider.max = Math.floor(duration).toString();
  }

  updateAudio (event : Event ) {
    const seekSlider = <HTMLInputElement>(event.target || event.currentTarget);
    const audio = <HTMLAudioElement> document.querySelector(`#music-metadata-${this.music.id}`);
    audio.currentTime = Number.parseInt(seekSlider.value);
  };

  updateTime () {
    const audio = <HTMLAudioElement> document.querySelector(`#music-metadata-${this.music.id}`);
    const seekSlider = <HTMLInputElement> document.getElementById(`seek-slider-${this.music.id}`);
    const currentTime = <HTMLSpanElement> document.getElementById(`current-time-${this.music.id}`);
    seekSlider.value = (Math.floor(audio.currentTime)).toString();
    currentTime.textContent = this.calculateTime(Number.parseInt(seekSlider?.value));
  }

  loadMetaData () {
    const audio = <HTMLAudioElement> document.querySelector(`#music-metadata-${this.music.id}`);
    this.displayDuration(audio?.duration);
    this.setSliderMax(audio?.duration);
  }

  selectedTime (event : Event ) {
    const seekSlider = <HTMLInputElement>(event.target || event.currentTarget);
    const currentTime = <HTMLSpanElement> document.getElementById(`current-time-${this.music.id}`);
    currentTime.textContent = this.calculateTime(Number.parseInt(seekSlider?.value));
  }
}

