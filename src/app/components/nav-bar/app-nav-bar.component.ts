import { Component, OnInit, Input} from '@angular/core';
import { PhotosHandler } from '../../services/PhotosHandler.service';
import { Router } from '@angular/router';
import { Section } from '../../models/business/Section';

/* Navigation bar of the app
  */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './app-nav-bar.component.html'
})
export class NavBarComponent implements OnInit {

  @Input() public sectionsList: Array<Section> = [];
  @Input() public activeSection: Section;
  @Input() public isOpenHamburgerMenu = false;

  private gallerySection: Section;
  private myFavoritesSection: Section;
  private artistSection: Section;

  private readonly sectionOffClass = 'nav-title section-off';
  private readonly sectionOnClass = 'nav-title section-on';

  private readonly galleryRouterLink = 'gallery';
  private readonly myFavoritesRouterLink = 'my-favorites';
  private readonly artistRouterLink = 'artist';

  private readonly routerLinksList: Array<string> = [
    this.galleryRouterLink,
    this.myFavoritesRouterLink,
    this.artistRouterLink
  ];

  constructor(
    private router: Router,
    private photosHandler: PhotosHandler
  ) { }

  ngOnInit() {
    this.initSections();
    this.subscribeToSectionsEvent();
  }

  public setSectionsActiveness(sectionLinkRouter: string): void {
    console.log('SetSectionsActiveness. sectionLinkRouter: ' + sectionLinkRouter);
    for (const section of this.sectionsList) {
      if (sectionLinkRouter === section.getRouterLink()) {
        section.setClassName(this.sectionOnClass);
        this.activeSection = section;
      } else {
        section.setClassName(this.sectionOffClass);
      }
    }

    // default case if no proper route found
    if (!this.routerLinksList.includes(sectionLinkRouter)) {
      this.gallerySection.setClassName(this.sectionOnClass);
      this.activeSection = this.gallerySection;
    }

    this.isOpenHamburgerMenu = false;
  }

  public clickedHamburgerMenu(): void {
    this.isOpenHamburgerMenu = !this.isOpenHamburgerMenu;
  }

  private initSections(): void {
    this.gallerySection = new Section(this.galleryRouterLink,
      'Gallery', undefined, this.sectionOffClass);
    this.myFavoritesSection = new Section(this.myFavoritesRouterLink,
      'My ', '/assets/icons/heart-fill-red.png', this.sectionOffClass);
    this.artistSection = new Section(this.artistRouterLink,
      'The photographer', undefined, this.sectionOffClass);
    this.sectionsList.push(this.gallerySection);
    this.sectionsList.push(this.myFavoritesSection);
    this.sectionsList.push(this.artistSection);
  }

  private subscribeToSectionsEvent(): void {
    this.router.events.subscribe((route: any) => {
      route = route.url.split('/')[1];
      this.setSectionsActiveness(route);
      console.log('SetSectionsActiveness - route: ' + route);
    });
  }
}
