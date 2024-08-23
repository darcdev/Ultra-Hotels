import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAgentLayoutComponent } from './travel-agent-layout.component';

describe('TravelAgentLayoutComponent', () => {
  let component: TravelAgentLayoutComponent;
  let fixture: ComponentFixture<TravelAgentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelAgentLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelAgentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
