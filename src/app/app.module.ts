import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { APIHandler } from './services/APIHandler.service';
import { PhotosHandler } from './services/PhotosHandler.service';
import { Cookies } from "./services/Cookies.service";

import { AppComponent } from './components/app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SectionGalleryComponent } from './components/section-gallery/section-gallery.component';
import { SectionMyFavoritesComponent } from './components/section-my-favorites/section-my-favorites.component';
import { SectionArtistComponent } from './components/section-artist/section-artist.component';
import { ThumbnailGalleryPhotoComponent } from './components/thumbnail-gallery-photo/thumbnail-gallery-photo.component';
import { ItemFavoritePhotoComponent } from './components/item-favorite-photo/item-favorite-photo.component';
import { ArSeeHomeComponent } from './components/ar-see-home/ar-see-home.component';
import { ModalPhotoComponent } from './components/modal-photo/modal-photo.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';


const appRoutes: Routes = [
  {path: 'gallery', component: SectionGalleryComponent, data: {"route":"/gallery"}},
  {path: 'artist', component: SectionArtistComponent,  data: {"route":"/artist"}},
  {path: 'my-favorites', component: SectionMyFavoritesComponent,  data: {"route":"/my-favorites"}},
  {path: '**', component: SectionGalleryComponent,  data: {"route":"/gallery"}}
];

@NgModule({
  declarations: [
    AppComponent,
    ThumbnailGalleryPhotoComponent,
    NavBarComponent,
    SectionGalleryComponent,
    SectionArtistComponent,
    SectionMyFavoritesComponent,
    ModalPhotoComponent,
    ItemFavoritePhotoComponent,
    ArSeeHomeComponent,
    ModalErrorComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [PhotosHandler, APIHandler, HttpClient, CookieService, Cookies],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalPhotoComponent,
    ModalErrorComponent
  ]
})

export class AppModule {}
