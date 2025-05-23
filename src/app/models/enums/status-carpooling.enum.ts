export enum StatusCarpooling {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REFUSED = 'REFUSED'
}

export const StatusCarpoolingLabel = {
  [StatusCarpooling.ACCEPTED]: 'acceptée',
  [StatusCarpooling.PENDING]: 'en attente',
  [StatusCarpooling.REFUSED]: 'refusée'
};
