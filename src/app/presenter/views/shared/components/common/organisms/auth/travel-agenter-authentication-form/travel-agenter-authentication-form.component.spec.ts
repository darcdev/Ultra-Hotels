import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgenterAuthenticationFormComponent } from './travel-agenter-authentication-form.component';

describe('TravelAgenterAuthenticationFormComponent', () => {
  let component: TravelAgenterAuthenticationFormComponent;
  let fixture: ComponentFixture<TravelAgenterAuthenticationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelAgenterAuthenticationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelAgenterAuthenticationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
