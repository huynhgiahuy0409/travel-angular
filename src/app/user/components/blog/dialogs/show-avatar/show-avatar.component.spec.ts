import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAvatarComponent } from './show-avatar.component';

describe('ShowAvatarComponent', () => {
  let component: ShowAvatarComponent;
  let fixture: ComponentFixture<ShowAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
