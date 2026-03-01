import { inject } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AUTHORS_VALIDATIONS_API } from '../../../application/validations-api';

export function lifeSpanValidator(dobCtrl: AbstractControl, dodCtrl: AbstractControl): ValidatorFn {
  const api = inject(AUTHORS_VALIDATIONS_API);
  return (_group: AbstractControl): ValidationErrors | null => {
    if (!dobCtrl.dirty && !dodCtrl.dirty) return null;

    const dob: Date | null = dobCtrl.value;
    const dod: Date | null = dodCtrl.value;

    if (!dob) return null;

    const result = api.validateLifeSpan({ dateOfBirth: dob, dateOfDeath: dod });
    if (!result.errors) return null;

    const { dateOfBirth: dobErrors, dateOfDeath: dodErrors } = result.errors;

    if (dobErrors.length) dobCtrl.markAsTouched({ onlySelf: true });
    if (dodErrors.length) dodCtrl.markAsTouched({ onlySelf: true });

    return { lifeSpanInvalid: { dateOfBirth: dobErrors, dateOfDeath: dodErrors } };
  };
}
