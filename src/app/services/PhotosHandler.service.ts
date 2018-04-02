import { Injectable } from '@angular/core';
import { APIHandler } from './APIHandler.service';
import { Photo } from '../models/business/Photo';
import { MyObservable } from '../models/technical/MyObservable';
import { MyObserver } from '../models/technical/MyObserver';
import { Cookies } from './Cookies.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PhotosHandler implements MyObservable {

  private photosList: Array<Photo> = [];
  private observersList: Array<MyObserver> = [];

  constructor(private apiHandler: APIHandler, private cookieService: Cookies) {

    let cookieExists: boolean = this.cookieService.cookieExists("MyFavorites");

    this.apiHandler.getAllPhotoIds().subscribe(data => {
      console.log("photo ids: " + data);
      let listPhotoIds: Array<string> = data;
      let count: number = 0;
      for (let photoId of listPhotoIds) {
        this.apiHandler.getPhotoProperties(photoId).subscribe(data => {
          console.log("photo data: ");
          console.log(data);
          let photo: Photo = new Photo(data.photoProperties, this.cookieService);
          if (cookieExists && this.cookieService.isFavorite(photoId)) {
            photo.setAsFavorite();
          }
          this.photosList.push(photo);

          // TODO: explain whats the point of the following lines
          count++;
          if (count >= listPhotoIds.length) {
            this.notifyObservers();
          }
        })
      }
    });
  }

  public generateCode(): Observable<string> {
    console.log("Photos Handler requested a session code.");
    return this.apiHandler.getCode(this.photosList);
  }

  public addObserver(observer: any): void {
    this.observersList.push(observer);
  }

  public notifyObservers(): void {
    for (let index in this.observersList) {
      this.observersList[index].receiveNotification();
    }
  }

  public getPhotos(): Array<Photo> {
    return this.photosList;
  }

  public getFavoritePhotos(): Array<Photo> {
    let favoritePhotosList: Array<Photo>=[];
    for(let photo of this.photosList) {
      if (photo.isFavorite()) {
        favoritePhotosList.push(photo);
      }
    }
    return favoritePhotosList;
  }

  public getPhoto(photoId: string): Photo {
    for(let index in this.photosList) {
      if (this.photosList[index].getId() == photoId) {
        return this.photosList[index];
      }
    }
    return undefined;
  }

}
