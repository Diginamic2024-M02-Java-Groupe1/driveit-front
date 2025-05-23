import {Collaborator} from "@models/collaborator.model";
import {Address} from "@models/address.model";
import {Vehicle} from "@models/vehicle.model";
import {Participants} from "@models/participants.model";

export interface Carpooling {
  id: number;
  departureDate: string;
  arrivalDate: string;
  organizer: Collaborator;
  departureAddress: Address;
  arrivalAddress: Address;
  participants: Participants[];
  vehicle: Vehicle;
  status: string;
}
