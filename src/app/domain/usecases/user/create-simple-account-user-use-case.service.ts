import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { RegisterUserRequestDTO } from '@/app/core/models/dtos/auth';
import { AuthResponse } from '@supabase/supabase-js';
import { AuthUserAdapter } from '@/app/domain/interfaces/auth-user-adapter';

@Injectable({
  providedIn: 'root',
})
export class CreateSimpleAccountUserUseCaseService
  implements UseCase<RegisterUserRequestDTO, AuthResponse>
{
  constructor(private authUserAdapter: AuthUserAdapter) {}

  async execute(
    registerUserData: RegisterUserRequestDTO
  ): Promise<AuthResponse> {
    return this.authUserAdapter.register(registerUserData);
  }
}
