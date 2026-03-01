import { inject, Injectable } from '@angular/core';
import { AuthorComputationsDomainService } from '../../../domain/domain-services';

@Injectable()
export class CalculateAgeComputator {

  private readonly computations = inject(AuthorComputationsDomainService);

  execute(dateOfBirth: Date, dateOfDeath?: Date | null): number | null {
    return this.computations.calculateAge(dateOfBirth, dateOfDeath);
  }
}
