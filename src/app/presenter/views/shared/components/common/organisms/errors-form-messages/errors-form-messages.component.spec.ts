import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsFormMessagesComponent } from './errors-form-messages.component';

describe('ErrorsFormMessagesComponent', () => {
  let component: ErrorsFormMessagesComponent;
  let fixture: ComponentFixture<ErrorsFormMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorsFormMessagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorsFormMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
