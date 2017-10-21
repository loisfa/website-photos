import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class Cookies {

  private listFavorites:Array<string>=[];

  constructor(private cookieService:CookieService) {
    if (this.cookieExists("MyFavorites")) {
      this.setListFavorites();
    } else {
      this.listFavorites=[];
    }
  }

  public setListFavorites() {
    this.listFavorites = [];
    let listObject:Array<string> = this.getCookie("MyFavorites");
    for (let photoName of listObject) {
      this.listFavorites.push(photoName);
    }
  }

  public cookieExists(cookieName:string):boolean {
    return this.cookieService.get(cookieName) !== ""
      && this.cookieService.get(cookieName) !== undefined;
  }

  private stringToArray(str:string):Array<string> {
    return str.split("&");
  }
  private arrayToString(strList:Array<string>):string {
    let str:string="";
    for(let index=0; index<strList.length; index++) {
      str+=strList[index];
      if (index < strList.length-1) {
        str+="&";
      }
    }
    return str;
  }

  private setCookie(cookieName:string, cookieList:Array<string>):void {
    let cookieStr:string=this.arrayToString(cookieList);
    console.log("cookieStr set:");
    console.log(cookieStr);
    this.cookieService.set(cookieName, cookieStr);
  }

  private getCookie(cookieName:string):Array<string> {
    console.log("getCookie");
    console.log(this.cookieService.get(cookieName));
    return this.stringToArray(this.cookieService.get(cookieName));
  }

  public isFavorite(photoName:string):boolean {
    if (this.listFavorites.includes(photoName)) {
      return true;
    } else return false;
  }
  public setFavorite(photoName:string):void {
    if (!(this.listFavorites.includes(photoName))) {
      this.listFavorites.push(photoName);
      this.setCookie("MyFavorites", this.listFavorites);
      console.log("set cookie favorite for "+photoName);
      console.log(this.getCookie("MyFavorites"));
    }
  }
  public unsetFavorite(photoName:string):void {
    let index = this.listFavorites.indexOf(photoName);
    if (index >= 0) {
       this.listFavorites.splice(index, 1);
       this.setCookie("MyFavorites", this.listFavorites);
       console.log("unset cookie favorite for "+photoName);
       console.log(this.getCookie("MyFavorites"));
    }
  }

}
