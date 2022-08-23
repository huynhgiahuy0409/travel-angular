import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorReviewPostItemComponent } from './author-review-post-item.component';

describe('AuthorReviewPostItemComponent', () => {
  let component: AuthorReviewPostItemComponent;
  let fixture: ComponentFixture<AuthorReviewPostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorReviewPostItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorReviewPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
