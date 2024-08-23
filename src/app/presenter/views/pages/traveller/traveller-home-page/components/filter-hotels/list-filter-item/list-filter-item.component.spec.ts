import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilterItemComponent } from './list-filter-item.component';

describe('ListFilterItemComponent', () => {
  let component: ListFilterItemComponent;
  let fixture: ComponentFixture<ListFilterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFilterItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListFilterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
