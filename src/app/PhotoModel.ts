export class PhotoModel {

  private properties:Object =
  {
    "name":null,
    "uri":null,
    "price":null,
    "dimensions":{
      "width": null,
      "height": null,
      "orientation":null // portrait | landscape
    },
    "description":null,
    "topics":[],
    "isFavorite":null
  };

  constructor(properties:Object) {
    console.log("properties");
    console.log(properties);
    this.setProperties(properties);
    console.log(this.properties);
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
  public getTopics() {
    return this.properties["topics"];
  }
  public isFavorite() {
    return this.properties["isFavorite"];
  }

  private checkPropertiesOk(properties:Object):boolean {
    let isOk = true;
    for (let property in properties) {
      if (this.properties[property]===undefined) {
        isOk=false;
        console.log("ERR property: "+property+" does not exist as a field");
      }
    }
    for (let property in this.properties) {
      if (properties[property]===undefined) {
        console.log("WARN property: "+property+" is undefined");
      }
    }
    return isOk;
  }

  private setProperties(properties:Object):void {
    if (this.checkPropertiesOk(properties)) {
      for (let property in properties) {
        this.properties[property] = properties[property];
      }
    } else {
      console.log("issues with properties of photo");
    }
  }
}
