import { Component, OnInit } from '@angular/core';
import { PhotosHandler } from '../../services/PhotosHandler.service';

/* This component is designed for the 'My favorites' section.
  NB: it also hosts the ar-see-home component
  */
@Component({
  selector: 'app-section-my-favorites',
  templateUrl: './section-my-favorites.component.html'
})
export class SectionMyFavoritesComponent implements OnInit {

  constructor(
    public photosHandler: PhotosHandler  // should be private, but AOT compilation fails when private
  ) { }

  ngOnInit() {
    console.log('this.photosHandler.getFavoritePhotos()');
    console.log(this.photosHandler.getFavoritePhotos());
  }

}
