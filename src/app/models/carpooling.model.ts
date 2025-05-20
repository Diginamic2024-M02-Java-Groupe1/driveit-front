import {Collaborator} from "@models/collaborator.model";
import {Address} from "@models/address.model";
import {Vehicle} from "@models/vehicle.model";

export interface Carpooling {
  id: number;
  departureDate: string;
  arrivalDate: string;
  organizer: Collaborator;
  departureAddress: Address;
  arrivalAddress: Address;
  passengers: Collaborator[];
  vehicle: Vehicle;
}
