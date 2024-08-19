import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerRegisterFormComponent } from './traveller-register-form.component';

describe('TravellerRegisterFormComponent', () => {
  let component: TravellerRegisterFormComponent;
  let fixture: ComponentFixture<TravellerRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravellerRegisterFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravellerRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
