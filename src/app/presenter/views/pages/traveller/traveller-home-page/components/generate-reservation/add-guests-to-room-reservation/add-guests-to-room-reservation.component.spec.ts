import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuestsToRoomReservationComponent } from './add-guests-to-room-reservation.component';

describe('AddGuestsToRoomReservationComponent', () => {
  let component: AddGuestsToRoomReservationComponent;
  let fixture: ComponentFixture<AddGuestsToRoomReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGuestsToRoomReservationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddGuestsToRoomReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
