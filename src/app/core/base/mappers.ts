export interface Mapper<Entity, DTO> {
  mapFrom(param: Entity): DTO;
  mapTo(param: DTO): Entity;
}
