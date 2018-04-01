import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThumbnailGalleryPhotoComponent } from './thumbnail-gallery-photo.component';

describe('ThumbnailGalleryPhotoComponent', () => {
  let component: ThumbnailGalleryPhotoComponent;
  let fixture: ComponentFixture<ThumbnailGalleryPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailGalleryPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailGalleryPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
