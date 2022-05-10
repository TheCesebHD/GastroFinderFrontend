import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestaurantAdminComponent } from './edit-restaurant-admin.component';

describe('EditRestaurantAdminComponent', () => {
  let component: EditRestaurantAdminComponent;
  let fixture: ComponentFixture<EditRestaurantAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRestaurantAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestaurantAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
