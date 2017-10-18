import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotoThumbnailComponent } from './photo-thumbnail/photo-thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoThumbnailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
