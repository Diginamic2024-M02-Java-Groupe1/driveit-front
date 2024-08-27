import {Vehicle} from "@models/vehicle.model";

export interface ResaVehicle {
  id?: number;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  vehicle: Vehicle;
}
