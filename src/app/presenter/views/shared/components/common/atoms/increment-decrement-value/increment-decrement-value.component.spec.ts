import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementDecrementValueComponent } from './increment-decrement-value.component';

describe('IncrementDecrementValueComponent', () => {
  let component: IncrementDecrementValueComponent;
  let fixture: ComponentFixture<IncrementDecrementValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncrementDecrementValueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncrementDecrementValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
