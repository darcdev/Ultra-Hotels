import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsReservationListComponent } from './guests-reservation-list.component';

describe('GuestsReservationListComponent', () => {
  let component: GuestsReservationListComponent;
  let fixture: ComponentFixture<GuestsReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestsReservationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuestsReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
