import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment.development";
import {Observable} from "rxjs";
import {Vehicle} from "@models/vehicle.model";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) { }


  public getVehicles() {
    return this.http.get<Vehicle[]>(environment.api + '/vehicules');
  }

  public getVehicule(id: string) {
    return this.http.get(environment.api + '/vehicules/' + id);
  }
}
