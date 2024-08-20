import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsBookingByAgentViewComponent } from './hotels-booking-by-agent-view.component';

describe('HotelsBookingByAgentViewComponent', () => {
  let component: HotelsBookingByAgentViewComponent;
  let fixture: ComponentFixture<HotelsBookingByAgentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsBookingByAgentViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelsBookingByAgentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
