import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPostDetailComponent } from './review-post-detail.component';

describe('ReviewPostDetailComponent', () => {
  let component: ReviewPostDetailComponent;
  let fixture: ComponentFixture<ReviewPostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPostDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
