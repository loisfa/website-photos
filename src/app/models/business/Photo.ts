import { Cookies } from '../../services/Cookies.service';

export class Photo {

  private properties:Object =
  {
    "name": null,
    "uri": null,
    "price": null,
    "dimensions":
    {
      "width": null,
      "height": null,
      "orientation": null // portrait | landscape
    },
    "description": null,
    "keywords": [],
    "isFavorite": false
  };

  constructor(properties:Object, private cookieService:Cookies) {
    this.setProperties(properties);
  }

  public changeFavorite() {
    if (this.isFavorite()==true) {
      this.unsetFavorite();
    } else {
      this.setFavorite();
    }
  }

  public unsetFavorite() {
    this.properties["isFavorite"]=false;
    this.cookieService.unsetFavorite(this.getName());
  }

  public setFavorite() {
    this.properties["isFavorite"]=true;
    this.cookieService.setFavorite(this.getName());
  }

  public getProperties():Object {
    return this.properties;
  }

  public getName() {
    return this.properties["name"];
  }

  public getUri() {
    return this.properties["uri"];
  }

  public getPrice() {
    return this.properties["price"];
  }

  public getDimensions() {
    return this.properties["dimensions"];
  }

  public getDescription() {
    return this.properties["description"];
  }

  public getKeywords() {
    return this.properties["keywords"];
  }

  public isFavorite() {
    return this.properties["isFavorite"];
  }

  private isPropertiesFormatOk(properties:Object):boolean {

    let isOk = true;
    for (let property in properties) {
      if (this.properties[property]===undefined) {
        isOk=false;
        console.log("ERR property: " + property + " does not exist as a field.");
      }
    }

    for (let property in this.properties) {
      if (properties[property]===undefined) {
        //console.log("WARN property: "+property+" is undefined");
      }
    }
    return isOk;

  }

  private setProperties(properties:Object):void {

    if (this.isPropertiesFormatOk(properties)) {
      for (let property in properties) {
        this.properties[property] = properties[property];
      }
    } else {
      console.log("issues with properties of photo");
    }

  }
}
