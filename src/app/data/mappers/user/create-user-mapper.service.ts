import { Injectable } from '@angular/core';
import { Mapper } from '@/app/core/base/mappers';
import { UserEntity } from '@/app/domain/entities/user.entity';
import { UserDto } from '@/app/data/dtos/user.dto';

@Injectable({
  providedIn: 'root',
})
export class CreateUserMapperService implements Mapper<UserEntity, UserDto> {
  mapFrom(param: UserEntity): UserDto {
    return {
      email: param.email,
      full_name: param.full_name,
      role: param.role,
      userId: param.authUser,
    };
  }
  mapTo(param: UserDto): UserEntity {
    return {
      id: param?.id,
      email: param.email,
      full_name: param.full_name,
      role: param.role,
      authUser: param.userId,
    };
  }
}
