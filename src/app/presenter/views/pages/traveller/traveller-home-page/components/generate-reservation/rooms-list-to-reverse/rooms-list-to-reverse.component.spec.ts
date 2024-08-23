import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsListToReverseComponent } from './rooms-list-to-reverse.component';

describe('RoomsListToReverseComponent', () => {
  let component: RoomsListToReverseComponent;
  let fixture: ComponentFixture<RoomsListToReverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsListToReverseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsListToReverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
