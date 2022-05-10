import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantmgmtComponent } from './restaurantmgmt.component';

describe('RestaurantmgmtComponent', () => {
  let component: RestaurantmgmtComponent;
  let fixture: ComponentFixture<RestaurantmgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantmgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantmgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
