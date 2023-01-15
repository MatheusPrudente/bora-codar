import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMusicComponent } from './card-music.component';

describe('CardMusicComponent', () => {
  let component: CardMusicComponent;
  let fixture: ComponentFixture<CardMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMusicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
