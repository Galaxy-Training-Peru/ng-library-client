import { inject, Injectable } from '@angular/core';
import type { AuthorsValidationsApi } from './contracts';
import type {
  ValidateFullNameRequest, ValidateFullNameResponse,
  ValidateLifeSpanRequest, ValidateLifeSpanResponse,
} from './contracts/author';
import { ValidateFullNameValidator, ValidateLifeSpanValidator } from '../validators/author';

@Injectable()
export class AuthorsValidationsApiImpl implements AuthorsValidationsApi {

  private readonly validateFullNameValidator = inject(ValidateFullNameValidator);
  private readonly validateLifeSpanValidator = inject(ValidateLifeSpanValidator);

  validateFullName(request: ValidateFullNameRequest): ValidateFullNameResponse {
    return { errors: this.validateFullNameValidator.execute(request.firstName, request.lastName) };
  }

  validateLifeSpan(request: ValidateLifeSpanRequest): ValidateLifeSpanResponse {
    return { errors: this.validateLifeSpanValidator.execute(request.dateOfBirth, request.dateOfDeath) };
  }
}
