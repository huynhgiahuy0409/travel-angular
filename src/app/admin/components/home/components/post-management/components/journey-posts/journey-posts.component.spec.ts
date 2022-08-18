import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyPostsComponent } from './journey-posts.component';

describe('JourneyPostsComponent', () => {
  let component: JourneyPostsComponent;
  let fixture: ComponentFixture<JourneyPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
