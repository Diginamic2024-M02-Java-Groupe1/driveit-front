import {Vehicle} from "@models/vehicle.model";

export default interface CarpoolingData {
  departureDateTime: {
    date: string;
    time: string;
  };
  arrivalDateTime: {
    date: string;
    time: string;
  };
  departureAddress: {
    number: string;
    street: string;
    type: string;
    city: string;
    zipcode: string;
  }
  arrivalAddress: {
    number: string;
    street: string;
    type: string;
    city: string;
    zipcode: string;
  }
  vehicle: number;
}
