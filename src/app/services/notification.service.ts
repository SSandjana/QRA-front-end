import {Injectable, Injector} from '@angular/core';
import {ActiveToast, ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private injector: Injector) {
  }

  private get toastr(): ToastrService {
    // Met injector. Met constructor injection wordt een cyclic dependency error gegooid
    return this.injector.get(ToastrService);
  }

  error(msg: string, title?: string): ActiveToast<any> {
    return this.toastr.error(
      msg ? msg : 'Er is een fout opgetreden.',
      title ? title : 'Fout', {
        closeButton: true,
        timeOut: 6000
      });
  }

  success(msg: string, title: string): ActiveToast<any> {
    return this.toastr.success(
      msg ? msg : 'De actie is succesvol uitgevoerd.',
      title ? title : 'Succes', {
        closeButton: true,
        timeOut: 4000
      });
  }

  warning(msg: string, title: string): ActiveToast<any> {
    return this.toastr.warning(
      msg ? msg : 'De actie is uitgevoerd.',
      title ? title : 'Waarschuwing', {
        closeButton: true,
        timeOut: 4000
      });
  }

  wait(msg: string, title: string): ActiveToast<any> {
    return this.toastr.show(
      msg ? msg : 'De actie is uitgevoerd.',
      title ? title : 'Waarschuwing', {
        closeButton: false,
        tapToDismiss: false, disableTimeOut: true
      });
  }

  close(toastId: number) {
    this.toastr.clear(toastId);
  }
}
