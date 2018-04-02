import { Cookies } from '../../services/Cookies.service';
import { Dimensions } from '../../models/business/Dimensions';

export class Photo {

  private id: string;
  private name: string;
  private uri: string;
  private price: number;
  private dimensions: Dimensions;
  private description: string;
  private keywords: Array<string>;
  private isFavoriteBool: boolean;

  constructor(photoProperties: Object, private cookieService: Cookies) {
    this.id = photoProperties["id"];
    this.name = photoProperties["name"];
    this.uri = photoProperties["uri"];
    this.price = photoProperties["price"];
    let dimensions: Object = photoProperties["dimensions"];
    this.dimensions = new Dimensions(
      dimensions["width"], dimensions["height"], dimensions["orientation"]);
    this.description = photoProperties["description"];
    this.keywords = photoProperties["keywords"];
  }

  public reverseIsFavorite(): void {
    if (this.isFavorite() == true) {
      this.setAsNotFavorite();
    } else {
      this.setAsFavorite();
    }
  }

  public setAsNotFavorite(): void {
    this.isFavoriteBool = false;
    this.cookieService.unsetFavorite(this.getName());
  }

  public setAsFavorite() {
    this.isFavoriteBool = true;
    this.cookieService.setFavorite(this.getName());
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getUri(): string {
    return this.uri;
  }

  public getPrice(): number {
    return this.price;
  }

  public getWidth(): number {
    return this.dimensions.getWidth();
  }

  public getHeight(): number {
    return this.dimensions.getHeight();
  }

  public getOrientation(): string {
    return this.dimensions.getOrientation();
  }

  public getDescription(): string {
    return this.description;
  }

  public getKeywords(): Array<string> {
    return this.getKeywords();
  }

  public isFavorite(): boolean {
    return this.isFavoriteBool;
  }

}
