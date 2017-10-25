import { Component } from '@angular/core';
import { PhotosHandler } from './PhotosHandler.service';
import { MyObserver } from './MyObserver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements MyObserver {
  private title = 'app';
  private listPhotos:Array<Object>=[];

  constructor(private photosHandler:PhotosHandler) {
    photosHandler.addObserver(this);
  }

  public receiveNotification():void {
    this.listPhotos = this.photosHandler.getPhotos();
  }
}
