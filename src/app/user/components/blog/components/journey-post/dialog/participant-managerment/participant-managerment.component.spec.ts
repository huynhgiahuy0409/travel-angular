import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantManagermentComponent } from './participant-managerment.component';

describe('ParticipantManagermentComponent', () => {
  let component: ParticipantManagermentComponent;
  let fixture: ComponentFixture<ParticipantManagermentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantManagermentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantManagermentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
