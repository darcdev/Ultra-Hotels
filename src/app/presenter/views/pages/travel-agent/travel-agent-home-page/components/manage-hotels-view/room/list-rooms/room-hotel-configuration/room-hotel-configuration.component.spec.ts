import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomHotelConfigurationComponent } from './room-hotel-configuration.component';

describe('RoomHotelConfigurationComponent', () => {
  let component: RoomHotelConfigurationComponent;
  let fixture: ComponentFixture<RoomHotelConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomHotelConfigurationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomHotelConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
