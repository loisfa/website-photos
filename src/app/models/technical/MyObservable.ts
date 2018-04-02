export interface MyObservable {

  addObserver(observer: any): void;

  notifyObservers(): void;

}
