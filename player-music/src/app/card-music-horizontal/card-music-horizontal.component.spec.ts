import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMusicHorizontalComponent } from './card-music-horizontal.component';

describe('CardMusicHorizontalComponent', () => {
  let component: CardMusicHorizontalComponent;
  let fixture: ComponentFixture<CardMusicHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMusicHorizontalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMusicHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
