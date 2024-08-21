import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilterHotelsComponent } from './list-filter-hotels.component';

describe('ListFilterHotelsComponent', () => {
  let component: ListFilterHotelsComponent;
  let fixture: ComponentFixture<ListFilterHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFilterHotelsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListFilterHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
