import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestReservationItemComponent } from './guest-reservation-item.component';

describe('GuestReservationItemComponent', () => {
  let component: GuestReservationItemComponent;
  let fixture: ComponentFixture<GuestReservationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestReservationItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuestReservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
