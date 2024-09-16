import {StatusVehicle} from "@models/enums/status-vehicle.enum";


export interface Vehicle {
  id?: number;
  registration: string;
  numberOfSeats: number;
  service?: boolean;
  emission: number;
  status?: StatusVehicle;
  motorization: string;
  model: string;
  category: string;
  brand: string;
  url: string;

}
