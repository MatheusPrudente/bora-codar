import { Component } from '@angular/core';
import { Music } from 'src/models/music';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'player-music';
  musics : Music[] = [
    {id : this.getUniqueId(3) , musicalBand : "Banda Rocketseat - 1", name : "Acorda Devinho - 1 ", url : "./../assets/acorda-pedrinho.mp3"},
    {id : this.getUniqueId(3) , musicalBand : "Banda Rocketseat - 2", name : "Acorda Devinho - 2", url : "./../assets/acorda-pedrinho.mp3"},
    {id : this.getUniqueId(3) , musicalBand : "Banda Rocketseat - 3", name : "Acorda Devinho - 3" , url : "./../assets/acorda-pedrinho.mp3"}
  ];
  music? : Music;

  constructor() { }

  selectMusic(selectMusic : Music) {
    this.music = selectMusic;
  }

  getUniqueId(parts: number): string {
    const stringArr = [];

    for(let i = 0; i< parts; i++){
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}
