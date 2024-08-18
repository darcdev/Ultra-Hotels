import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainNavComponent } from '@/app/presenter/views/shared/components/shared/organisms/main-nav/main-nav.component';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
