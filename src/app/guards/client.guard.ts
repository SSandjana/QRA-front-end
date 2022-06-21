import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {Location} from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private location: Location, private toastrService: ToastrService) {
  }

  canActivate() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let role = user.role.type;
    if (role == "Client") {
      return true;
    } else {
      this.toastrService.error("You have no rights");
      setTimeout(() => this.location.back(), 1000)
      return false;
    }
  }

}
