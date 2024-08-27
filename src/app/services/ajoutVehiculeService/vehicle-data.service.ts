import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vehicle} from "@models/vehicle";
import { Observable} from "rxjs";
import {environment} from "@env/environment";
import {AuthService} from "@services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class VehicleDataService {
  private apiURL = environment.api;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  insertVehicle(vehicle: Vehicle): Observable<string> {
    return this.http.post(`${this.apiURL}/vehicules/service`, vehicle, { responseType: 'text'});
  }
}
