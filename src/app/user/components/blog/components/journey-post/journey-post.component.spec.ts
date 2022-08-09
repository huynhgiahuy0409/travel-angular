import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyPostComponent } from './journey-post.component';

describe('JourneyPostComponent', () => {
  let component: JourneyPostComponent;
  let fixture: ComponentFixture<JourneyPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
