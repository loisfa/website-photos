import { HttpClient } from '@angular/common/http';
import { ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class APIHandler {

  private urlBase = "http://localhost:8080/";
  private routeAllPhotoNames:string="api/photos/";
  private routePhotoUri:string="api/photo/uri/";
  private urlAllPhotoNames:string;
  private urlPhoto:string;

  constructor(private http: HttpClient) {
    this.urlAllPhotoNames = this.urlBase + this.routeAllPhotoNames;
    this.urlPhoto = this.urlBase + this.routePhotoUri;
  }

  public getAllPhotoNames():Observable<Array<string>> {

    console.log("in get all photo names");
    let photoNames:string;
    console.log("url: "+this.urlAllPhotoNames);
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
    console.log("hey on url:"+url);
    return this.http.get(url)
      .map(res => { return res; })
      .catch(error => Observable.throw(error));
    }


  private parse(unparsedString:string):string {
    let re = " ";
    let parsedString:string = unparsedString.replace(re, '+');
    return parsedString;
  }

  private parseToList(unparsedString:string):Array<string> {
    let listStrings = unparsedString.split('&');
    return listStrings;
  }
}
