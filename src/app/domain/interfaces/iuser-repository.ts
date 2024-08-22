import { UserEntity } from '@/app/domain/entities/user.entity';

export abstract class IUserRepository {
  abstract getUserProfile(userId: string): Promise<UserEntity | null>;
  abstract createUserProfile(profile: UserEntity): Promise<UserEntity>;
}
