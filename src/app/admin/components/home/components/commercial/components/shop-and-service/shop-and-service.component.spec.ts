import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAndServiceComponent } from './shop-and-service.component';

describe('ShopAndServiceComponent', () => {
  let component: ShopAndServiceComponent;
  let fixture: ComponentFixture<ShopAndServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopAndServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAndServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
