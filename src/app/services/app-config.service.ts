import {Injectable} from '@angular/core';
import {ValidatorFn, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() {
  }

  public static get basicNameValidator(): ValidatorFn {
    return this.validatorPattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð ,.\'\\-]+$');
  }

  public static get nonWhiteSpacesValidator(): ValidatorFn {
    return this.validatorPattern('\\S');
  }

  private static validatorPattern(pattern: string) {
    return Validators.pattern(new RegExp(pattern));
  }
}
