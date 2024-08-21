import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewHotelModalComponent } from './create-new-hotel-modal.component';

describe('CreateNewHotelModalComponent', () => {
  let component: CreateNewHotelModalComponent;
  let fixture: ComponentFixture<CreateNewHotelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewHotelModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNewHotelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
