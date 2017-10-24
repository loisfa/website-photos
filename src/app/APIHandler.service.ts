import { HttpClient } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { PhotoModel } from './PhotoModel';
import { environment } from '../environments/environment';

@Injectable()
export class APIHandler {

  private urlBase = environment.url;
  private routeAllPhotoNames:string="api/photos/";
  private routePhotoUri:string="api/photo/uri/";
  private routeARCode:string="api/ar/web/";
  private urlAllPhotoNames:string;
  private urlPhoto:string;
  private urlARCode:string;

  constructor(private http: HttpClient) {
    console.log("env api url: "+this.urlBase);
    this.urlAllPhotoNames = this.urlBase + this.routeAllPhotoNames;
    this.urlPhoto = this.urlBase + this.routePhotoUri;
    this.urlARCode = this.urlBase + this.routeARCode;
  }

  public getCode(listPhotos:Array<PhotoModel>):Observable<string> {
    let stringPhotoNames = this.parseListToUrlString(listPhotos);
    let url:string = this.urlARCode + stringPhotoNames;
    console.log("apiHAndler asked code with url: "+url);
    return this.http.get(url)
      .map(res => {
        return res;
      })
      .catch(error => Observable.throw(error));
  }

  private parseListToUrlString(listPhotos:Array<PhotoModel>):string {
    let str:string="";
    for(let index=0; index<listPhotos.length; index++) {
      str += this.parse(listPhotos[index].getName());
      if (index < listPhotos.length-1) {
        str+= "&";
      }
    }
    return str;
  }

  public getAllPhotoNames():Observable<Array<string>> {
    let photoNames:string;
    return this.http.get(this.urlAllPhotoNames)
      .map(res => {
        return res;
      })
      .catch(error => Observable.throw(error));
  }

  public getPhoto(unparsedName:string):Observable<any> {
    let photoName:string = this.parse(unparsedName);
    let url:string = this.urlPhoto + photoName;
    let image:any[];
    return this.http.get(url)
      .map(res => { return res; })
      .catch(error => Observable.throw(error));
    }

  private parse(unparsedString:string):string {
    let re = / /gi;
    let parsedString:string = unparsedString.replace(re, '+');
    console.log("parsedString: "+parsedString);
    console.log("parsedString: "+parsedString);
    return parsedString;
  }

  private parseToList(unparsedString:string):Array<string> {
    let listStrings = unparsedString.split('&');
    return listStrings;
  }
}
