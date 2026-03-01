import { Injectable } from '@angular/core';
import { FullName } from '../value-objects/full-name';
import { LifeSpan } from '../value-objects/life-span';

@Injectable({ providedIn: 'root' })
export class AuthorValidationsDomainService {

  validateFullName(firstName: string, lastName: string): { firstName: string[]; lastName: string[] } | null {
    return FullName.validate(firstName, lastName);
  }

  validateLifeSpan(dateOfBirth: Date, dateOfDeath: Date | null): { dateOfBirth: string[]; dateOfDeath: string[] } | null {
    if (!dateOfBirth || Number.isNaN(dateOfBirth.getTime())) return null;
    return LifeSpan.validate(dateOfBirth, dateOfDeath);
  }
}
