export class RoomEntity {
  constructor(
    public type: string,
    public basePrice: number,
    public taxes: number,
    public roomNumber: string,
    public capacity: number,
    public description: string,
    public isAvailable?: boolean,
    public hotel?: string,
    public id?: string
  ) {}
}
