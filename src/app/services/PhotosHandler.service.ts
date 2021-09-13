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

    const cookieExists: boolean = this.cookieService.cookieExists('MyFavorites');

    this.apiHandler.getAllPhotoIds().subscribe((ids: string[]) => {
      console.log('photo ids: ' + ids);
      const listPhotoIds: Array<string> = ids;
      let count = 0;
      for (const photoId of listPhotoIds) {
        this.apiHandler.getPhotoProperties(photoId).subscribe(data => {
          console.log('photo data: ');
          console.log(data);
          const photo: Photo = new Photo(data.photoProperties, this.cookieService);
          if (cookieExists && this.cookieService.isFavorite(photoId)) {
            photo.setAsFavorite();
          }
          this.photosList.push(photo);

          // TODO: explain what is the point of the following lines
          count++;
          if (count >= listPhotoIds.length) {
            this.notifyObservers();
          }
        });
      }
    });
  }

  public generateCode(): Observable<string> {
    console.log('Photos Handler requested a session code.');
    return this.apiHandler.getCode(this.photosList);
  }

  public addObserver(observer: any): void {
    this.observersList.push(observer);
  }

  public notifyObservers(): void {
    for (const observer of this.observersList) {
      observer.receiveNotification();
    }
  }

  public getPhotos(): Array<Photo> {
    return this.photosList;
  }

  public getFavoritePhotos(): Array<Photo> {
    const favoritePhotosList: Array<Photo> = [];
    for (const photo of this.photosList) {
      if (photo.isFavorite()) {
        favoritePhotosList.push(photo);
      }
    }
    return favoritePhotosList;
  }

  public getPhoto(photoId: string): Photo {
    for (const index in this.photosList) {
      if (this.photosList[index].getId() === photoId) {
        return this.photosList[index];
      }
    }
    return undefined;
  }

}
