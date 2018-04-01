import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemFavoritePhotoComponent } from './item-favorite-photo.component';

describe('ItemFavoritePhotoComponent', () => {
  let component: ItemFavoritePhotoComponent;
  let fixture: ComponentFixture<ItemFavoritePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFavoritePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFavoritePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
