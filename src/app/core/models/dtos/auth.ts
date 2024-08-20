import { ActorRoles } from '@/app/core/constants/ActorRoles';

export interface LoginUserRequestDTO {
  email: string;
  password: string;
}

export interface RegisterUserRequestDTO {
  email: string;
  password: string;
  role: ActorRoles;
}
