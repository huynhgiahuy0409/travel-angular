import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoverImageComponent } from './update-cover-image.component';

describe('UpdateCoverImageComponent', () => {
  let component: UpdateCoverImageComponent;
  let fixture: ComponentFixture<UpdateCoverImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCoverImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCoverImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
