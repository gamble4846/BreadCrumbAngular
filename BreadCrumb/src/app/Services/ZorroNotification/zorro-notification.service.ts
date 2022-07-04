import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class ZorroNotificationService {

  constructor(private notification: NzNotificationService) { }

  generateNotification(type: string, title: string, desc: string): void {
    this.notification.create(
      type,
      title,
      desc
    );
  }

  log(type: string, title: string, desc: string, showNotificaiton: boolean, data:any):void {
    if(showNotificaiton){
      this.generateNotification(type,title,desc);
    }
  }
}
