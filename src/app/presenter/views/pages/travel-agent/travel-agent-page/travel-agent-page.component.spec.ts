import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentPageComponent } from './travel-agent-page.component';

describe('TravelAgentPageComponent', () => {
  let component: TravelAgentPageComponent;
  let fixture: ComponentFixture<TravelAgentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelAgentPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelAgentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
