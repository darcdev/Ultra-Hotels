import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRoomsHotelComponent } from './sidebar-rooms-hotel.component';

describe('SidebarRoomsHotelComponent', () => {
  let component: SidebarRoomsHotelComponent;
  let fixture: ComponentFixture<SidebarRoomsHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRoomsHotelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarRoomsHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
