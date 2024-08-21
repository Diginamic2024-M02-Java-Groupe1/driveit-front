import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "@models/vehicle";
import {StatusVehicle} from "@models/enums/status-vehicle";
import {Motorization} from "@models/motorization";
import {Model} from "@models/model";
import {Category} from "@models/category";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class VehicleDataService {
  private url: string = 'http://localhost:8081';

  constructor(private http: HttpClient, private vehicle: Vehicle) {
  }

  insertVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.url}/api/vehicule/service`, vehicle);
  }
}
