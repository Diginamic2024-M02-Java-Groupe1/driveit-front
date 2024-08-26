import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResaVehicle} from "@models/resa-vehicle.model";
import {StatusFilter} from "@models/enums/status-filter.enum";


@Injectable({
  providedIn: 'root'
})
export class ResaVehicleService {

  private apiURL = environment.api;

  constructor(private http: HttpClient) {
  }

  getFilteredVehicles(dateTimeStart: string, dateTimeEnd: string): Observable<ResaVehicle[]> {
    let params = new HttpParams()
      .set('dateStart', dateTimeStart)
      .set('dateEnd', dateTimeEnd);
    return this.http.get<ResaVehicle[]>(`${this.apiURL}/vehicules/location/filtrer`, {params});
  }

  getReservations(statusChoice: StatusFilter): Observable<ResaVehicle[]> {
    let params = new HttpParams()
      .set('status', statusChoice);
    return this.http.get<ResaVehicle[]>(`${this.apiURL}/vehicules/location/reservation`, {params});
  }


  reserveVehicle(reservationVehicle: ResaVehicle): Observable<string> {
    return this.http.post(`${this.apiURL}/vehicules/location/reserver`, reservationVehicle, {
      responseType: 'text'
    });
  }

  deleteReservationVehicle(id: number): Observable<string> {
    return this.http.delete(`${this.apiURL}/vehicules/location/supprimer/${id}`, { responseType: 'text' });
  }


}
