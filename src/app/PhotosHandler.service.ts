import { Injectable } from '@angular/core';
import { APIHandler } from './APIHandler.service';
import { PhotoModel } from './PhotoModel';
import { MyObservable } from './interface-observable';
import { Cookies } from './Cookies.service';


@Injectable()
export class PhotosHandler implements MyObservable {

  private listPhotos:Array<PhotoModel>=[];
  private listObservers=[];
  private listMyFavorites:Array<string>=[];

  constructor(private apiHandler:APIHandler, private cookieService:Cookies) {
    let cookieExists:boolean = this.cookieService.cookieExists("MyFavorites");
    let listPhotoNames;
    this.apiHandler.getAllPhotoNames().subscribe(data => {
      listPhotoNames = data;
      let count:number=0;
      for (let photoName of listPhotoNames) {
        this.apiHandler.getPhoto(photoName).subscribe(data => {
          let photo:PhotoModel = new PhotoModel(data.photoProperties, this.cookieService);
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

  public addObserver(observer:any) {
    this.listObservers.push(observer);
  }
  public notifyObservers() {
    for (let index in this.listObservers) {
      this.listObservers[index].receiveNotification();
    }
  }

  public getPhotos():Array<PhotoModel> {
    return this.listPhotos;
  }
  public getPhoto(photoName:string):PhotoModel {
    let photo;
    for(let index in this.listPhotos) {
      if (this.listPhotos[index].getName() == photoName) {
        return this.listPhotos[index];
      }
    }
    return undefined;
  }
}
