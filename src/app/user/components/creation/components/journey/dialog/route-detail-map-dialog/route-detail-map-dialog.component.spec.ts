import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDetailMapDialogComponent } from './route-detail-map-dialog.component';

describe('RouteDetailMapDialogComponent', () => {
  let component: RouteDetailMapDialogComponent;
  let fixture: ComponentFixture<RouteDetailMapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteDetailMapDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDetailMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
