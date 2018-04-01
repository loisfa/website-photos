import { Component, OnInit, Input} from '@angular/core';
import { PhotosHandler } from '../../services/PhotosHandler.service';
import { ActivatedRoute, Router } from '@angular/router';

/* Navigation bar of the app
  */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() public listSections:Array<Object>=[];  // should be private, but AOT compilation fails when private
  @Input() public activeSection:Object={};
  @Input() public hamburgerMenuIsOpen:boolean=false;

  constructor(
    private router:Router,
    private photosHandler:PhotosHandler
  ) {}

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
    this.router.events.subscribe((route:any) => {
      route = route.url.split("/")[1];
      this.setActiveSection(route);
      console.log("setActiveSection - route:"+route);
    });
  }

  public setActiveSection(sectionLinkRouter:string):void {
    for(let section of this.listSections) {
      console.log("section['routerLink']: " + section["routerLink"]);
      console.log("sectionLinkRouter: " + sectionLinkRouter);
      if (sectionLinkRouter==section["routerLink"]) {
        console.log("match");
        section["class"]="nav-title section-on";
        this.activeSection=section;
      } else {
        console.log("no match");
        section["class"]="nav-title section-off";
      }
    }
  }

  public clickedHamburgerMenu():void {
    this.hamburgerMenuIsOpen = !this.hamburgerMenuIsOpen;
  }
}
