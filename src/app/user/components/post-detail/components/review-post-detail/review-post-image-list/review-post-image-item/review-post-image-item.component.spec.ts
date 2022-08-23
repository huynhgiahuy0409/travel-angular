import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPostImageItemComponent } from './review-post-image-item.component';

describe('ReviewPostImageItemComponent', () => {
  let component: ReviewPostImageItemComponent;
  let fixture: ComponentFixture<ReviewPostImageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPostImageItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPostImageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
