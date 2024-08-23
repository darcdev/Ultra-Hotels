import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoggedPanelComponent } from './user-logged-panel.component';

describe('UserLoggedPanelComponent', () => {
  let component: UserLoggedPanelComponent;
  let fixture: ComponentFixture<UserLoggedPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoggedPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoggedPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
