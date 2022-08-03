import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {
  private internalConnectionChanged = new Subject<boolean>;
  get isOnline() {
    return !!window.navigator.onLine;
  }

  get connectionChanged(){
    return this.internalConnectionChanged.asObservable();
  }

  constructor() {
    window.addEventListener('online', () => this.updateOnlineStatus());
     window.addEventListener('offline', () => this.updateOnlineStatus());
     console.log("is online?",this.isOnline);

  }



  private updateOnlineStatus(){
    this.internalConnectionChanged.next(window.navigator.onLine);
  }
}
