import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../PhotosHandler.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  // @Input() private listPhotos:Array<Object>;

  constructor(private photosHandler:PhotosHandler) { }

  ngOnInit() {
  }

}
