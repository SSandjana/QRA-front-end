import { Injectable } from '@angular/core';
import {NotificationService} from "./notification.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpErrHandlerService {

  constructor(private notificationService: NotificationService) {
  }

  handle(err: HttpErrorResponse, withNotification: boolean) {
    if (err.error instanceof Error) {
      const e: Error = err.error;
      console.log('Client side error' + e);
      if (withNotification) {
        this.notificationService.error(e.name + ': ' + e.message, 'Client error');
      }
    } else {
      console.log('Server side error: ');
      console.log(err);
      this.handleServerError(err, withNotification);
    }
  }

  private errObjectToString(o: any): string {
    let msg = '';

    if (o) {
      msg = 'CODE: ' + (o.code ? o.code : '-1') + '. ' +
        (o.message ? o.message : 'Ongespecificeerde fout');
    } else {
      msg = 'Ongespecificeerde fout';
    }

    return msg;
  }

  private toErrorDetailObject(err): any {
    if (err.error) {
      let o = null;
      if (typeof err.error === 'string') {
        o = JSON.parse(err.error);
      } else {
        o = err.error;
      }
      return o;
    } else if (err.message) {
      return err;
    }

    return null;
  }

  private handleServerError(err: HttpErrorResponse, withNotification: boolean) {
    const detail = this.toErrorDetailObject(err);
    const msg = this.errObjectToString(detail);
    const level = detail.level;

    let notifTitle = 'Server error';

    switch (detail.type) {
      case 'ACCESS_DENIED':
        notifTitle = 'Toegang gewijgerd';
        break;
    }

    if (withNotification) {
      switch (level) {
        case 'SEVERE':
        case 'CRITICAL':
          this.notificationService.error(msg, notifTitle);
          break;
        case 'WARNING':
        case 'NORMAL':
          this.notificationService.warning(msg, notifTitle);
          break;
        default:
          this.notificationService.error(msg, notifTitle);
          break;
      }
    }
  }

  private handleWorkflowError(msg: string, detail: any) {
    // FIXME: voorlopig geen dialog service, maar notification
    /* const d = this.dialogService.addModal(MessageDialogComponent, {
         title: 'Fout bij starten van de aanvraag',
         msg: msg,
         style: ''
       }
     ).subscribe((result) => {
       d.unsubscribe();
     });*/

    this.notificationService.error(msg, 'Server Error');
  }
}
