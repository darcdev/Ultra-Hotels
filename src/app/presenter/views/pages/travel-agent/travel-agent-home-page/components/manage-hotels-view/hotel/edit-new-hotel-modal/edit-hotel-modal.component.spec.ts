import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHotelModalComponent } from './edit-hotel-modal.component';

describe('EditNewHotelModalComponent', () => {
  let component: EditHotelModalComponent;
  let fixture: ComponentFixture<EditHotelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHotelModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditHotelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
