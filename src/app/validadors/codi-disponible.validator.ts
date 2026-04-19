import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ElementService } from '../serveis/element.service';

export function codiDisponibleValidator(
  elementService: ElementService,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return of(control.value).pipe(
      delay(500),
      map(async (codi: string) => {
        const disponible = await elementService.codiDisponible(codi);
        return disponible ? null : { codiNoDisponible: { value: codi } };
      }),
    ) as Observable<ValidationErrors | null>;
  };
}
