import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../../services/PhotosHandler.service';

/* This component is designed for the gallery section.
  */
@Component({
  selector: 'app-section-gallery',
  templateUrl: './section-gallery.component.html'
})
export class SectionGalleryComponent implements OnInit {

  constructor(
    public photosHandler: PhotosHandler  // should be private, but AOT compilation fails when private
  ) { }

  ngOnInit() { }

}
