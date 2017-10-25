export interface MyObservable {
  addObserver(observer:any):void;
  // removeObserver(observer:any):void;
  notifyObservers():void;
}
