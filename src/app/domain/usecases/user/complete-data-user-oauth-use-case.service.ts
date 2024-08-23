import { Injectable } from '@angular/core';
import { IUserRepository } from '@/app/domain/interfaces/iuser-repository';
import { UserEntity } from '@/app/domain/entities/user.entity';
import { ActorRoles } from '@/app/core/constants/ActorRoles';
import { UseCase } from '@/app/domain/base/usecase';

@Injectable({
  providedIn: 'root',
})
export class CompleteDataUserOAuthUseCaseService
  implements UseCase<UserEntity, void>
{
  constructor(private _userRepository: IUserRepository) {}

  async execute(user: UserEntity): Promise<void> {
    if (!user?.id) {
      throw new Error('User id is required');
    }
    const existingProfile = await this._userRepository.getUserProfile(user.id);

    if (!existingProfile) {
      const newUserProfile: UserEntity = {
        authUser: user.id,
        email: user.email,
        full_name: user.full_name,
        role: ActorRoles.TRAVELLER,
      };
      await this._userRepository.createUserProfile(newUserProfile);
    }
  }
}
