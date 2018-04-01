import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionMyFavoritesComponent } from './section-my-favorites.component';

describe('SectionMyFavoritesComponent', () => {
  let component: SectionMyFavoritesComponent;
  let fixture: ComponentFixture<SectionMyFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionMyFavoritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMyFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
