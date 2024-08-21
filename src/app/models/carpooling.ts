import {Collaborator} from "@models/collaborator";
import {Address} from "@models/address";
import {Vehicle} from "@models/vehicle";

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
