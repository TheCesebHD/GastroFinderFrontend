import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirtComponent } from './wirt.component';

describe('WirtComponent', () => {
  let component: WirtComponent;
  let fixture: ComponentFixture<WirtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WirtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WirtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
