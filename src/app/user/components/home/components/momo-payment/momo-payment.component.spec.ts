import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomoPaymentComponent } from './momo-payment.component';

describe('MomoPaymentComponent', () => {
  let component: MomoPaymentComponent;
  let fixture: ComponentFixture<MomoPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomoPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomoPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
