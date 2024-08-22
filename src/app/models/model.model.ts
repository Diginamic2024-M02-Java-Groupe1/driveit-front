import {Brand} from "@models/brand.model";

export interface Model {
  id: number;
  name: string;
  brand: Brand;
}
