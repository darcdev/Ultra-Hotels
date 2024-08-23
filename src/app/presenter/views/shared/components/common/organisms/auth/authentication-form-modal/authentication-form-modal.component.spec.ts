import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationFormModalComponent } from './authentication-form-modal.component';

describe('AuthenticationFormModalComponent', () => {
  let component: AuthenticationFormModalComponent;
  let fixture: ComponentFixture<AuthenticationFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationFormModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
