import {StatusVehicle} from "@models/enums/status-vehicle";
import {Collaborator} from "@models/collaborator";
import {Motorization} from "@models/motorization";
import {Model} from "@models/model";
import {Category} from "@models/category";
import {Carpooling} from "@models/carpooling";

export interface Vehicle {
  id: number;
  registration: string;
  numberOfSeats: number;
  service: boolean;
  emission: number;
  url:string;
  status: StatusVehicle;
  collaborator: Collaborator[];
  carpooling: Carpooling[];
  motorization: Motorization;
  model: Model;
  category: Category;

}
