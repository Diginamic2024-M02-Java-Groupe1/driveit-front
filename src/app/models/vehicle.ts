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
  status: StatusVehicle;
  collaborators: Collaborator[];
  carpooling: Carpooling[];
  motorization: Motorization;
  model: Model;
  category: Category;
  url: string;

}
