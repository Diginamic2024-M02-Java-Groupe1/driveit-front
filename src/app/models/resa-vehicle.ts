import {StatusVehicle} from "@models/enums/status-vehicle";
import {Collaborator} from "@models/collaborator";
import {Vehicle} from "@models/vehicle";

export interface ResaVehicle {
  dateStart: string;
  dateEnd: string;
  timeStart: string;
  timeEnd: string;
  vehicle: Vehicle;
}
