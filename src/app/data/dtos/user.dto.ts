import { ActorRoles } from '@/app/core/constants/ActorRoles';

export interface UserDto {
  id?: string;
  full_name: string;
  email: string;
  role?: ActorRoles;
  userId?: string;
}
