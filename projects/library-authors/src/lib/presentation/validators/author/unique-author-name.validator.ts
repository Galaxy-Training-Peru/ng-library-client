import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AUTHORS_PUBLIC_API } from '../../../application/public-api';

export function uniqueAuthorNameValidator(
  fnCtrl: AbstractControl,
  lnCtrl: AbstractControl,
  idCtrl: AbstractControl,
): AsyncValidatorFn {
  const api = inject(AUTHORS_PUBLIC_API);
  return async (group: AbstractControl): Promise<ValidationErrors | null> => {
    if (group.pristine || (!fnCtrl.dirty && !lnCtrl.dirty)) return null;
    if (group.hasError('fullNameInvalid')) return null;

    const firstName = (fnCtrl.value ?? '').trim();
    const lastName  = (lnCtrl.value ?? '').trim();
    const excludeAuthorId = (idCtrl.value as string)?.trim() || undefined;

    if (!firstName || !lastName) return null;

    const res = await api.checkAuthorNameUniqueness({ firstName, lastName, excludeAuthorId });
    if (res.isUnique) return null;

    fnCtrl.markAsTouched({ onlySelf: true });
    lnCtrl.markAsTouched({ onlySelf: true });

    const msg = 'Another author already has this full name.';
    return { fullNameNotUnique: { firstName: [msg], lastName: [msg] } };
  };
}
