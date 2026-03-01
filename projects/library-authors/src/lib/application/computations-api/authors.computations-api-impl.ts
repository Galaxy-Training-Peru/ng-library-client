import { inject, Injectable } from '@angular/core';
import type { AuthorsComputationsApi } from './contracts';
import type {
  BuildFullNameRequest, BuildFullNameResponse,
  CalculateAgeRequest, CalculateAgeResponse,
  IsDeceasedRequest, IsDeceasedResponse,
} from './contracts/author';
import { BuildFullNameComputator, CalculateAgeComputator, IsDeceasedComputator } from '../computators/author';

@Injectable()
export class AuthorsComputationsApiImpl implements AuthorsComputationsApi {

  private readonly buildFullNameComputator = inject(BuildFullNameComputator);
  private readonly calculateAgeComputator  = inject(CalculateAgeComputator);
  private readonly isDeceasedComputator    = inject(IsDeceasedComputator);

  buildFullName(request: BuildFullNameRequest): Promise<BuildFullNameResponse> {
    return Promise.resolve({ fullName: this.buildFullNameComputator.execute(request.firstName, request.lastName) });
  }

  calculateAge(request: CalculateAgeRequest): Promise<CalculateAgeResponse> {
    return Promise.resolve({ age: this.calculateAgeComputator.execute(request.dateOfBirth, request.dateOfDeath) });
  }

  isDeceased(request: IsDeceasedRequest): Promise<IsDeceasedResponse> {
    return Promise.resolve({ isDeceased: this.isDeceasedComputator.execute(request.dateOfBirth, request.dateOfDeath) });
  }
}
