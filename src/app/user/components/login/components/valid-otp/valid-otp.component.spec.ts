import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidOTPComponent } from './valid-otp.component';

describe('ValidOTPComponent', () => {
  let component: ValidOTPComponent;
  let fixture: ComponentFixture<ValidOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidOTPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
