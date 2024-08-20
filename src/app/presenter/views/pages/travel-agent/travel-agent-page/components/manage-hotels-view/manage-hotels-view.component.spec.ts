import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHotelsViewComponent } from './manage-hotels-view.component';

describe('ManageHotelsViewComponent', () => {
  let component: ManageHotelsViewComponent;
  let fixture: ComponentFixture<ManageHotelsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageHotelsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageHotelsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
