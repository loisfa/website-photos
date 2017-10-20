import { Component, OnInit, Input } from '@angular/core';
import { Photo } from './photo';

@Component({
  selector: 'app-photo-thumbnail',
  templateUrl: './photo-thumbnail.component.html',
  styleUrls: ['./photo-thumbnail.component.css']
})
export class PhotoThumbnailComponent implements OnInit {

  @Input() private imgProperties:string;
  /*
  private name:string;
  private description:string;
  private width:number;
  private height:number;
  private isLandscapeOriented:boolean;
  private price:number;
  private isFavorite:boolean;
  private topics:Array<string>;
  */

  constructor() { }

  ngOnInit() {
    //console.log(this.imgSrc);
  }

}
