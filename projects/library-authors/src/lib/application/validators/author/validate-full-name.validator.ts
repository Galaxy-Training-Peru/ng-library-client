import { inject, Injectable } from '@angular/core';
import { AuthorValidationsDomainService } from '../../../domain/domain-services';

@Injectable()
export class ValidateFullNameValidator {

  private readonly validations = inject(AuthorValidationsDomainService);

  execute(firstName: string, lastName: string): { firstName: string[]; lastName: string[] } | null {
    return this.validations.validateFullName(firstName, lastName);
  }
}
