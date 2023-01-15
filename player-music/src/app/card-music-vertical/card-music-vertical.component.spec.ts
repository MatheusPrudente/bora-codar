import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMusicVerticalComponent } from './card-music-vertical.component';

describe('CardMusicVerticalComponent', () => {
  let component: CardMusicVerticalComponent;
  let fixture: ComponentFixture<CardMusicVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMusicVerticalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMusicVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
