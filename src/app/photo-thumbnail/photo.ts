export class Photo {

  private id:Number;
  private name:string;
  private url:string;
  private dimensions:Array<Number>;
  private description:string;
  private price:Number;
  private keywords:Array<string>;
  private topics:Array<string>;
  private image:any;

  constructor() {
    this.image = new Image();
  }

}
