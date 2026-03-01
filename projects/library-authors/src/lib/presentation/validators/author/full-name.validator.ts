import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AUTHORS_VALIDATIONS_API } from '../../../application/validations-api';

export function fullNameValidator(fnCtrl: AbstractControl, lnCtrl: AbstractControl): AsyncValidatorFn {
  const api = inject(AUTHORS_VALIDATIONS_API);
  return async (_group: AbstractControl): Promise<ValidationErrors | null> => {
    if (!(fnCtrl.dirty || lnCtrl.dirty)) return null;

    const first = (fnCtrl.value ?? '').trim();
    const last  = (lnCtrl.value ?? '').trim();

    const result = api.validateFullName({ firstName: first, lastName: last });
    if (!result.errors) return null;

    const { firstName: firstErrors, lastName: lastErrors } = result.errors;
    if (!firstErrors.length && !lastErrors.length) return null;

    return { fullNameInvalid: { firstName: firstErrors, lastName: lastErrors } };
  };
}
