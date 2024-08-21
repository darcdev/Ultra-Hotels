import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellerHomePageComponent } from './traveller-home-page.component';

describe('TravellerHomePageComponent', () => {
  let component: TravellerHomePageComponent;
  let fixture: ComponentFixture<TravellerHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravellerHomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TravellerHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
