import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialDialogComponent } from './commercial-dialog.component';

describe('CommercialDialogComponent', () => {
  let component: CommercialDialogComponent;
  let fixture: ComponentFixture<CommercialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
