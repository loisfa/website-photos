export class Section {

  private routerLink: string;
  private title: string;
  private imgUri: string;
  private className: string;

  constructor(routerLink: string, title: string, imgUri: string, className: string) {
    this.routerLink = routerLink;
    this.title = title;
    this.imgUri = imgUri;
    this.className = className;
  }

  public getRouterLink(): string {
    return this.routerLink;
  }

  public getTitle(): string {
    return this.title;
  }

  public getImgUri(): string {
    return this.imgUri;
  }

  public setClassName(className: string): void {
    this.className = className;
  }

  public getClassName(): string {
    return this.className;
  }
}
