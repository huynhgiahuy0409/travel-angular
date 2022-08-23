import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPostImageListComponent } from './review-post-image-list.component';

describe('ReviewPostImageListComponent', () => {
  let component: ReviewPostImageListComponent;
  let fixture: ComponentFixture<ReviewPostImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPostImageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPostImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
