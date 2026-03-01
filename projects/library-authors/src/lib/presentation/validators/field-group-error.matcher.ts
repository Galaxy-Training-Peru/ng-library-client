import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class FieldGroupErrorMatcher implements ErrorStateMatcher {
  constructor(
    private readonly groupKeys: string | string[],
    private readonly fieldKey:  string,
  ) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (!control) return false;
    const parent    = control.parent as FormGroup | null;
    const submitted = !!form?.submitted;
    const touched   = !!(control.touched || parent?.touched || submitted);
    if (!touched || !parent) return false;

    const keys = Array.isArray(this.groupKeys) ? this.groupKeys : [this.groupKeys];

    return keys.some(k => {
      const groupError = parent.getError?.(k) as Record<string, unknown> | true | null;
      if (!groupError) return false;
      if (groupError === true) return true;
      const fieldErr = groupError[this.fieldKey];
      if (Array.isArray(fieldErr)) return fieldErr.length > 0;
      return !!fieldErr;
    });
  }
}
