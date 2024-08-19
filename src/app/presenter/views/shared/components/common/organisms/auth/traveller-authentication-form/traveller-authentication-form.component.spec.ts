import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerAuthenticationFormComponent } from './traveller-authentication-form.component';

describe('TravellerAuthenticationFormComponent', () => {
  let component: TravellerAuthenticationFormComponent;
  let fixture: ComponentFixture<TravellerAuthenticationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravellerAuthenticationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravellerAuthenticationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
