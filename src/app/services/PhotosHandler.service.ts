import { Injectable } from '@angular/core';
import { APIHandler } from './APIHandler.service';
import { Photo } from '../models/business/Photo';
import { MyObservable } from '../models/technical/MyObservable';
import { Cookies } from './Cookies.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PhotosHandler implements MyObservable {

  private listPhotos:Array<Photo>=[];
  private listObservers=[];

  constructor(private apiHandler:APIHandler, private cookieService:Cookies) {
    let cookieExists:boolean = this.cookieService.cookieExists("MyFavorites");
    let listPhotoNames;
    this.apiHandler.getAllPhotoNames().subscribe(data => {
      listPhotoNames = data;
      let count:number=0;
      for (let photoName of listPhotoNames) {
        this.apiHandler.getPhoto(photoName).subscribe(data => {
          let photo:Photo = new Photo(data.photoProperties, this.cookieService);
          if (cookieExists && this.cookieService.isFavorite(photoName)) {
            photo.setFavorite();
          }
          this.listPhotos.push(photo);
          count++;
          if (count >= listPhotoNames.length) {
            this.notifyObservers();
          }
        })
      }
    });
  }

  public generateCode() : Observable<string> {
    console.log("Photos Handler requested a session code.");
    return this.apiHandler.getCode(this.listPhotos);
  }

  public addObserver(observer:any) {
    this.listObservers.push(observer);
  }
  public notifyObservers() {
    for (let index in this.listObservers) {
      this.listObservers[index].receiveNotification();
    }
  }

  public getPhotos():Array<Photo> {
    return this.listPhotos;
  }
  public getFavoritePhotos():Array<Photo> {
    let listFavoritePhotos:Array<Photo>=[];
    for(let photo of this.listPhotos) {
      if (photo.isFavorite()) {
        listFavoritePhotos.push(photo);
      } else {
      }
    }
    return listFavoritePhotos;
  }
  public getPhoto(photoName:string):Photo {
    let photo;
    for(let index in this.listPhotos) {
      if (this.listPhotos[index].getName() == photoName) {
        return this.listPhotos[index];
      }
    }
    return undefined;
  }
}
