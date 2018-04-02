export class Dimensions {

  private width: number;
  private height: number;
  private orientation: string; // "portrait" vs "landscape"

  constructor(width: number, height: number, orientation: string) {
    this.width = width;
    this.height = height;
    this.orientation = orientation;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getOrientation(): string {
    return this.orientation;
  }

}
