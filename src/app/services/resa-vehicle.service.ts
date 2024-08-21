import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResaVehicle} from "@models/resa-vehicle";


@Injectable({
  providedIn: 'root'
})
export class ResaVehicleService {

  private apiURL = environment.api;
  constructor(private http:HttpClient) { }

  getFilteredVehicles(dateTimeStart: string,dateTimeEnd: string):Observable<ResaVehicle[]> {

    let params = new HttpParams()
        .set('dateStart', dateTimeStart)
        .set('dateEnd', dateTimeEnd);

    return this.http.get<ResaVehicle[]>(`${this.apiURL}/vehicules/location/filtrer`,{params});
  }
}
