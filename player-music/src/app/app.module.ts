import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardMusicComponent } from './card-music/card-music.component';
import { CardMusicHorizontalComponent } from './card-music-horizontal/card-music-horizontal.component';
import { CardMusicVerticalComponent } from './card-music-vertical/card-music-vertical.component';

@NgModule({
  declarations: [
    AppComponent,
    CardMusicComponent,
    CardMusicHorizontalComponent,
    CardMusicVerticalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
