import { RoomEntity } from '@/app/domain/entities/room.entity';

export class HotelEntity {
  constructor(
    public name: string,
    public description: string,
    public country: string,
    public city: string,
    public additionalAdressInfo: string,
    public latitude?: number,
    public longitude?: number,
    public rooms?: RoomEntity[],
    public isActive?: boolean,
    public agency?: string,
    public id?: string
  ) {}
}
