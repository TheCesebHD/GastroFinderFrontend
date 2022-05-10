import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAdministrationComponent } from './restaurant-administration.component';

describe('RestaurantAdministrationComponent', () => {
  let component: RestaurantAdministrationComponent;
  let fixture: ComponentFixture<RestaurantAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
