import {CityZipCode} from "@models/city-zip-code";

export interface Address {
  id: number;
  streetNumber: string;
  streetName: string;
  cityZipCode: CityZipCode;
}
