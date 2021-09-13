import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Photo } from '../models/business/Photo';
import { environment } from '../../environments/environment';

@Injectable()
export class APIHandler {

  private routeAllPhotoNames = 'api/photos/get-all-ids/';
  private routePhotoProperties = 'api/photos/get-properties/';
  private routeARCode = 'api/ar/get-session-code/';

  private rootUrl: string = environment.url;

  private urlAllPhotoNames: string;
  private urlPhotoProperties: string;
  private urlARCode: string;

  constructor(private http: HttpClient) {
    console.log('API root url: ' + this.rootUrl);
    this.urlAllPhotoNames = this.rootUrl + this.routeAllPhotoNames;
    this.urlPhotoProperties = this.rootUrl + this.routePhotoProperties;
    this.urlARCode = this.rootUrl + this.routeARCode;
  }

  public getCode(listPhotos: Array<Photo>): Observable<string> {
    const stringPhotoNames: string = this.parseListToUrlString(listPhotos);
    const url: string = this.urlARCode + stringPhotoNames;
    console.log('APIHAndler asked code with url: ' + url);
    return this.http.get(url)
      .catch(error => Observable.throw(error));
  }

  private parseListToUrlString(listPhotos: Array<Photo>): string {
    let str = '';
    for (let index = 0; index < listPhotos.length; index++) {
      str += this.parse(listPhotos[index].getName());
      if (index < listPhotos.length - 1) {
        str += '&';
      }
    }
    return str;
  }

  public getAllPhotoIds(): Observable<Array<string>> {
    return this.http.get(this.urlAllPhotoNames)
      .catch(error => Observable.throw(error));
  }

  public getPhotoProperties(photoId: string): Observable<any> {
    const url: string = this.urlPhotoProperties + photoId;
    return this.http.get(url)
      .catch(error => Observable.throw(error));
    }

  private parse(unparsedString: string): string {
    const re = / /gi;
    const parsedString: string = unparsedString.replace(re, '+');
    console.log('parsedString: ' + parsedString);
    return parsedString;
  }

  private parseToList(unparsedString: string): Array<string> {
    const listStrings = unparsedString.split('&');
    return listStrings;
  }

}
