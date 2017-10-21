import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { PhotoThumbnailComponent } from './photo-thumbnail/photo-thumbnail.component';
import { PhotosHandler } from './PhotosHandler.service';
import { APIHandler } from './APIHandler.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './artist/artist.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { CookieService } from 'ngx-cookie-service';
import { Cookies } from "./Cookies.service";


const appRoutes: Routes = [
  { path: 'gallery', component: GalleryComponent, data: {"route":"/gallery"}},
  { path: 'artist', component: ArtistComponent,  data: {"route":"/artist"}},
  { path: 'my-favorites', component: MyFavoritesComponent,  data: {"route":"/my-favorites"}},
  { path: '**', component: GalleryComponent,  data: {"route":"/gallery"}}
];

@NgModule({
  declarations: [
    AppComponent,
    PhotoThumbnailComponent,
    NavBarComponent,
    GalleryComponent,
    ArtistComponent,
    MyFavoritesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
    ),
  ],
  providers: [PhotosHandler, APIHandler, HttpClient, CookieService, Cookies],
  bootstrap: [AppComponent]
})

export class AppModule {}
