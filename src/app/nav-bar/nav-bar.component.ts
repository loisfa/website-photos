import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() listSections:Array<Object>=[];

  constructor() {

  }

  ngOnInit() {
    let galleryObject:Object= {
      "routerLink":"/gallery",
      "text":"Gallery",
      "imgUri":undefined,
      "class":"nav-title section-on"
    };
    let artistObject:Object= {
      "routerLink":"/artist",
      "text":"The photographer",
      "imgUri":undefined,
      "class":"nav-title section-off"
    };
    let myFavoritesObject:Object= {
      "routerLink":"/my-favorites",
      "text":"My ",
      "imgUri":"/assets/icons/heart-fill-red.png",
      "class":"nav-title section-off"
    };
    this.listSections.push(galleryObject);
    this.listSections.push(artistObject);
    this.listSections.push(myFavoritesObject);
    console.log(this.listSections);
  }

  onClickSection(sectionLinkRouter:string):void {
    console.log("sectionlinkRouter");
    console.log(sectionLinkRouter);

    for(let section of this.listSections) {
      if (sectionLinkRouter===section["routerLink"]) {
        section["class"]="nav-title section-on";
      } else {
        section["class"]="nav-title section-off";
      }
    }
  }

}
