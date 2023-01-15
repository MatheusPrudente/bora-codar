import { CardMusicComponent } from './../card-music/card-music.component';
import { Component, Input } from '@angular/core';
import { Music } from 'src/models/music';

@Component({
  selector: 'app-card-music-horizontal',
  templateUrl: './card-music-horizontal.component.html'
})
export class CardMusicHorizontalComponent extends CardMusicComponent{
}
