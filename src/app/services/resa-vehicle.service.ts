import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResaVehicle} from "@models/resa-vehicle";
import {H} from "@angular/cdk/keycodes";


@Injectable({
  providedIn: 'root'
})
export class ResaVehicleService {

  private apiURL = environment.api;
  private token = localStorage.getItem('token');
  constructor(private http:HttpClient) { }

  getFilteredVehicles(dateTimeStart: string,dateTimeEnd: string):Observable<ResaVehicle[]> {

    let params = new HttpParams()
        .set('dateStart', dateTimeStart)
        .set('dateEnd', dateTimeEnd);

    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`);

    return this.http.get<ResaVehicle[]>(`${this.apiURL}/vehicules/location/filtrer`);
  }
}
