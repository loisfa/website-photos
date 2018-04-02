import { Component } from '@angular/core';
import { PhotosHandler } from '../services/PhotosHandler.service';
import { MyObserver } from '../models/technical/MyObserver';

/* Main component - at the top of the hierarchy. It hosts:
 - the nav bar
 - the 3 sections (gallery-section, my-favorites-section, artist-section)
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements MyObserver {

  private title: string = 'app';
  private listPhotos: Array<Object> = [];

  constructor(private photosHandler: PhotosHandler) {
    photosHandler.addObserver(this);
  }

  public receiveNotification(): void {
    this.listPhotos = this.photosHandler.getPhotos();
  }
}
