import { Component, OnInit, Input } from '@angular/core';
import { PhotosHandler } from '../PhotosHandler.service'
import { PhotoModel } from '../PhotoModel';

@Component({
  selector: 'app-photo-thumbnail',
  templateUrl: './photo-thumbnail.component.html',
  styleUrls: ['./photo-thumbnail.component.css']
})
export class PhotoThumbnailComponent implements OnInit {

  @Input() private imgProperties:Object;
  @Input() private heartUri:string;
  @Input() private src:string;

  constructor(private photosHandler:PhotosHandler) { }

  ngOnInit() {}

  public clickedFavorite():void {
    console.log("clicked favorite for "+this.imgProperties["name"]);
    this.photosHandler.getPhoto(this.imgProperties["name"]).changeFavorite();
    this.imgProperties = this.photosHandler.getPhoto(this.imgProperties["name"]).getProperties();
  }

}
