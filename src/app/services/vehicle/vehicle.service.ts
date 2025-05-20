import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment.development";
import {Vehicle} from "@models/vehicle.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiURL = environment.api;
  constructor(private http: HttpClient) { }


  public getVehicles() {
    return this.http.get<Vehicle[]>(`${this.apiURL}/vehicules`);
  }

  public getVehicleById(id: string) {
    return this.http.get(environment.api + '/vehicules/' + id);
  }

  public insertVehicleService(vehicle: Vehicle): Observable<string>{
    return this.http.post<string>(`${this.apiURL}/vehicules/service`, vehicle, {responseType: 'text' as 'json'});
  }

  public updateVehicleService(id: number): Observable<string>{
    return this.http.put<string>(`${this.apiURL}/vehicules/service/${id}`, id, {responseType: 'text' as 'json'});
  }

  public deleteVehicle(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiURL}/vehicules/service/${id}`, {responseType: 'text' as 'json'});
  }

}
