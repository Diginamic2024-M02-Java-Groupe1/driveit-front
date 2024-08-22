import {StatusVehicle} from "@models/enums/status-vehicle";

export interface Vehicle {
  id?: number;
  registration: string;
  numberOfSeats: number;
  service: boolean;
  emission: number;
  status?: StatusVehicle;
  motorizationId: number;
  model: string;
  categoryId: number;
  brandId: number;
  url: string;

}
