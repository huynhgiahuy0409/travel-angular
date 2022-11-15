import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderImageComponent } from './slider-image.component';

describe('SliderImageComponent', () => {
  let component: SliderImageComponent;
  let fixture: ComponentFixture<SliderImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
