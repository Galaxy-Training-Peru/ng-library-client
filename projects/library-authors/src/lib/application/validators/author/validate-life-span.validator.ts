import { inject, Injectable } from '@angular/core';
import { AuthorValidationsDomainService } from '../../../domain/domain-services';

@Injectable()
export class ValidateLifeSpanValidator {

  private readonly validations = inject(AuthorValidationsDomainService);

  execute(dateOfBirth: Date, dateOfDeath: Date | null): { dateOfBirth: string[]; dateOfDeath: string[] } | null {
    return this.validations.validateLifeSpan(dateOfBirth, dateOfDeath);
  }
}
