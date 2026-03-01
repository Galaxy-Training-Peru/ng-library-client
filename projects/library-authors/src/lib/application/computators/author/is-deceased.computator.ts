import { inject, Injectable } from '@angular/core';
import { AuthorComputationsDomainService } from '../../../domain/domain-services';

@Injectable()
export class IsDeceasedComputator {

  private readonly computations = inject(AuthorComputationsDomainService);

  execute(dateOfBirth: Date, dateOfDeath: Date | null): boolean | null {
    return this.computations.isDeceased(dateOfBirth, dateOfDeath);
  }
}
