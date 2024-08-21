import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelConfigurationComponent } from './hotel-configuration.component';

describe('HotelConfigurationComponent', () => {
  let component: HotelConfigurationComponent;
  let fixture: ComponentFixture<HotelConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelConfigurationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
