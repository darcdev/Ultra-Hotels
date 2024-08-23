import { ActorRoles } from '@/app/core/constants/ActorRoles';

export class UserEntity {
  constructor(
    public full_name: string,
    public email: string,
    public role?: ActorRoles,
    public id?: string,
    public authUser?: string
  ) {}
}
