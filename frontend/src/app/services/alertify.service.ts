import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }
  success(message: string) {
    alertify.success(message);
  }
  alert(message: string) {
    alertify.alert(message);
  }

  confirm({message, callbanck_delete,}: {message: string; callbanck_delete: () => any;}) {
    alertify.confirm(message, function (e: any) {
      if (e) {
        callbanck_delete();
        alertify.success('¡Registro eliminado!');
      }
    });
  }
}
