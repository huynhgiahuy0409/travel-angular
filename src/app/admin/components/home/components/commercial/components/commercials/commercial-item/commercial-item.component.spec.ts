import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialItemComponent } from './commercial-item.component';

describe('CommercialItemComponent', () => {
  let component: CommercialItemComponent;
  let fixture: ComponentFixture<CommercialItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
