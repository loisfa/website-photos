import { Component, OnInit } from '@angular/core';
import { PhotosHandler } from '../PhotosHandler.service';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit {

  constructor(private photosHandler:PhotosHandler) { }

  ngOnInit() {
    console.log("this.photosHandler.getFavoritePhotos()");
    console.log(this.photosHandler.getFavoritePhotos());
  }

}
