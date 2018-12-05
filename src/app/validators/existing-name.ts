import { AbstractControl} from '@angular/forms';

import { HeroService } from '../services/-hero.service';
import {map} from 'rxjs/operators';

export class ExistingNameValidator {

  static validate(heroService: HeroService) {
    return (control: AbstractControl) => {
      return heroService.checkIfNameExist(control.value).pipe(
        map(res => {
        return res ? null : { nameTaken: true };
      }));
    };
  }
}
