import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHotelsComponent } from './filter-hotels.component';

describe('FilterHotelsComponent', () => {
  let component: FilterHotelsComponent;
  let fixture: ComponentFixture<FilterHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterHotelsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
