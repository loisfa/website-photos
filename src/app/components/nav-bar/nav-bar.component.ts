import { Component, OnInit, Input} from '@angular/core';
import { PhotosHandler } from '../../services/PhotosHandler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../models/business/Section';

/* Navigation bar of the app
  */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() public sectionsList: Array<Section> = [];  // should be private, but AOT compilation fails when private
  @Input() public activeSection: Section;
  @Input() public isOpenHamburgerMenu: boolean = false;

  private gallerySection: Section;
  private myFavoritesSection: Section;
  private artistSection: Section;

  private static readonly sectionOffClass: string = "nav-title section-off";
  private static readonly sectionOnClass: string = "nav-title section-on";

  private static readonly galleryRouterLink = "gallery";
  private static readonly myFavoritesRouterLink = "my-favorites";
  private static readonly artistRouterLink = "artist";

  private static readonly routerLinksList: Array<string> = [
    NavBarComponent.galleryRouterLink,
    NavBarComponent.myFavoritesRouterLink,
    NavBarComponent.artistRouterLink];

  constructor(
    private router: Router,
    private photosHandler: PhotosHandler
  ) { }

  ngOnInit() {
    this.initSections();
    this.subscribeToSectionsEvent();
  }

  public setSectionsActiveness(sectionLinkRouter: string): void {
    console.log("SetSectionsActiveness. sectionLinkRouter: " + sectionLinkRouter);
    for(let section of this.sectionsList) {
      if (sectionLinkRouter === section.getRouterLink()) {
        section.setClassName(NavBarComponent.sectionOnClass);
        this.activeSection = section;
      } else {
        section.setClassName(NavBarComponent.sectionOffClass);
      }
    }

    // default case if no proper route found
    if (!NavBarComponent.routerLinksList.includes(sectionLinkRouter)) {
      this.gallerySection.setClassName(NavBarComponent.sectionOnClass);
      this.activeSection = this.gallerySection;
    }
  }

  public clickedHamburgerMenu(): void {
    this.isOpenHamburgerMenu = !this.isOpenHamburgerMenu;
  }

  private initSections(): void {
    this.gallerySection = new Section(NavBarComponent.galleryRouterLink,
      "Gallery", undefined, NavBarComponent.sectionOffClass);
    this.myFavoritesSection = new Section(NavBarComponent.myFavoritesRouterLink,
      "My ", "/assets/icons/heart-fill-red.png", NavBarComponent.sectionOffClass);
    this.artistSection = new Section(NavBarComponent.artistRouterLink,
      "The photographer", undefined, NavBarComponent.sectionOffClass);
    this.sectionsList.push(this.gallerySection);
    this.sectionsList.push(this.myFavoritesSection);
    this.sectionsList.push(this.artistSection);
  }

  private subscribeToSectionsEvent(): void {
    this.router.events.subscribe((route: any) => {
      route = route.url.split("/")[1];
      this.setSectionsActiveness(route);
      console.log("SetSectionsActiveness - route: " + route);
    });
  }
}
