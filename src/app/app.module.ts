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


const appRoutes: Routes = [
  { path: 'gallery', component: GalleryComponent },
  { path: 'artist', component: ArtistComponent },
  { path: 'my-favorites', component: MyFavoritesComponent },
  { path: '*', component: GalleryComponent }
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
  providers: [PhotosHandler, APIHandler, HttpClient],
  bootstrap: [AppComponent]
})

export class AppModule {}
