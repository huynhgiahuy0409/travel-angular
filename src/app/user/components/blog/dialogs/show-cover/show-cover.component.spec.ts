import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCoverComponent } from './show-cover.component';

describe('ShowCoverComponent', () => {
  let component: ShowCoverComponent;
  let fixture: ComponentFixture<ShowCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
