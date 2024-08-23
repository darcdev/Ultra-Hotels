import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerLayoutComponent } from './traveller-layout.component';

describe('TravelAgentLayoutComponent', () => {
  let component: TravellerLayoutComponent;
  let fixture: ComponentFixture<TravellerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravellerLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravellerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
