import { Injectable } from '@angular/core';
import { APIHandler } from './APIHandler.service';
import { PhotoModel } from './PhotoModel';
import { MyObservable } from './interface-observable';


@Injectable()
export class PhotosHandler implements MyObservable {

  private listPhotos:Array<Object>=[];
  private listObservers=[];

  constructor(private apiHandler:APIHandler) {
    //this.listPhotos=null;
    let listPhotoNames;
    this.apiHandler.getAllPhotoNames().subscribe(data => {
      listPhotoNames = data;
      let count:number=0;
      for (let photoName of listPhotoNames) {
        this.apiHandler.getPhoto(photoName).subscribe(data => {
          console.log("data.photoProperties");
          console.log(data.photoProperties);
          let photo = new PhotoModel(data.photoProperties);
          this.listPhotos.push(photo);
          console.log(this.listPhotos);
          count++;
          if (count >= listPhotoNames.length) {
            console.log(count);
            console.log(listPhotoNames.length);
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

  public getPhotos():Array<Object> {
    return this.listPhotos;
  }
}
