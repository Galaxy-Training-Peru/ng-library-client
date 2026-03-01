import { Injectable } from '@angular/core';
import { FullName } from '../value-objects/full-name';
import { LifeSpan } from '../value-objects/life-span';

@Injectable({ providedIn: 'root' })
export class AuthorComputationsDomainService {

  calculateAge(dateOfBirth: Date, dateOfDeath?: Date | null): number | null {
    return LifeSpan.computeAge(dateOfBirth, dateOfDeath);
  }

  isDeceased(dateOfBirth: Date, dateOfDeath: Date | null): boolean | null {
    return LifeSpan.computeIsDeceased(dateOfBirth, dateOfDeath);
  }

  buildFullName(firstName: string, lastName: string): string | null {
    return FullName.computeFullName(firstName, lastName);
  }
}
