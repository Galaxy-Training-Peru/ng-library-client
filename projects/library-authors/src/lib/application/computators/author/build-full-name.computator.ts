import { inject, Injectable } from '@angular/core';
import { AuthorComputationsDomainService } from '../../../domain/domain-services';

@Injectable()
export class BuildFullNameComputator {

  private readonly computations = inject(AuthorComputationsDomainService);

  execute(firstName: string, lastName: string): string | null {
    return this.computations.buildFullName(firstName, lastName);
  }
}
