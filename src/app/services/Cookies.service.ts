import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class Cookies {

  private myFavoritesList: Array<string> = [];

  constructor(private cookieService: CookieService) {
    if (this.cookieExists('MyFavorites')) {
      this.setMyFavoritesList();
    } else {
      this.myFavoritesList = [];
    }
  }

  public setMyFavoritesList() {
    this.myFavoritesList = [];
    const listObject: Array<string> = this.getCookie('MyFavorites');
    for (const photoName of listObject) {
      this.myFavoritesList.push(photoName);
    }
  }

  public cookieExists(cookieName: string): boolean {
    return this.cookieService.get(cookieName) !== ''
      && this.cookieService.get(cookieName) !== undefined;
  }

  private stringToArray(str: string): Array<string> {
    return str.split('&');
  }

  private arrayToString(strList: Array<string>): string {
    let str = '';
    for (let index = 0; index < strList.length; index++) {
      str += strList[index];
      if (index < strList.length - 1) {
        str += '&';
      }
    }
    return str;
  }

  private setCookie(cookieName: string, cookieList: Array<string>): void {
    const cookieStr: string = this.arrayToString(cookieList);
    this.cookieService.set(cookieName, cookieStr);
  }

  private getCookie(cookieName: string): Array<string> {
    return this.stringToArray(this.cookieService.get(cookieName));
  }

  public isFavorite(photoName: string): boolean {
    if (this.myFavoritesList.includes(photoName)) {
      return true;
    } else {
      return false;
    }
  }

  public setFavorite(photoName: string): void {
    if (!(this.myFavoritesList.includes(photoName))) {
      this.myFavoritesList.push(photoName);
      this.setCookie('MyFavorites', this.myFavoritesList);
    }
  }

  public unsetFavorite(photoName: string): void {
    const index = this.myFavoritesList.indexOf(photoName);
    if (index >= 0) {
       this.myFavoritesList.splice(index, 1);
       this.setCookie('MyFavorites', this.myFavoritesList);
    }
  }

}
