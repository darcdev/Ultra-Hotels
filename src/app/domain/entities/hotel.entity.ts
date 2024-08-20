export class HotelEntity {
  constructor(
    public name: string,
    public description: string,
    public country: string,
    public city: string,
    public additionalAdressInfo: string,
    public isActive?: boolean,
    public agency?: string,
    public id?: string
  ) {}
}
