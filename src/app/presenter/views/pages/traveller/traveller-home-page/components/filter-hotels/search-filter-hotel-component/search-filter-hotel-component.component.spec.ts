import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterHotelComponentComponent } from './search-filter-hotel-component.component';

describe('SearchFilterHotelComponentComponent', () => {
  let component: SearchFilterHotelComponentComponent;
  let fixture: ComponentFixture<SearchFilterHotelComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterHotelComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFilterHotelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
