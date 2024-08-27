import {StatusVehicle} from "@models/enums/status-vehicle.enum";
import {Collaborator} from "@models/collaborator.model";
import {Motorization} from "@models/motorization.model";
import {Model} from "@models/model.model";
import {Category} from "@models/category.model";
import {Carpooling} from "@models/carpooling.model";
import {Brand} from "@models/brand.model";

export interface Vehicle {
  id?: number;
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
  brand: Brand;
}
