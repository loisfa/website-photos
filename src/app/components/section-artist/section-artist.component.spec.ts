import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionArtistComponent } from './section-artist.component';

describe('SectionArtistComponent', () => {
  let component: SectionArtistComponent;
  let fixture: ComponentFixture<SectionArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
