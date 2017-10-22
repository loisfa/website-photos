import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosHandler } from '../PhotosHandler.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() listSections:Array<Object>=[];

  constructor(private route:ActivatedRoute,
    private photosHandler:PhotosHandler) {}

  ngOnInit() {
    let galleryObject:Object= {
      "routerLink":"gallery",
      "text":"Gallery",
      "imgUri":undefined,
      "class":"nav-title section-off"
    };
    let artistObject:Object= {
      "routerLink":"artist",
      "text":"The photographer",
      "imgUri":undefined,
      "class":"nav-title section-off"
    };
    let myFavoritesObject:Object= {
      "routerLink":"my-favorites",
      "text":"My ",
      "imgUri":"/assets/icons/heart-fill-red.png",
      "class":"nav-title section-off"
    };
    this.listSections.push(galleryObject);
    this.listSections.push(myFavoritesObject);
    this.listSections.push(artistObject);
  }

  public setActivatedSection(sectionLinkRouter:string):void {

    for(let section of this.listSections) {
      if (sectionLinkRouter===section["routerLink"]) {
        section["class"]="nav-title section-on";
      } else {
        section["class"]="nav-title section-off";
      }
    }
  }

}
