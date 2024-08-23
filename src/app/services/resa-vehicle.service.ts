import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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

  getReservations(idCollabo: number, statusChoice: StatusFilter): Observable<ResaVehicle[]> {
    let params = new HttpParams()
      .set('status', statusChoice);
    return this.http.get<ResaVehicle[]>(`${this.apiURL}/vehicules/location/reservation/${idCollabo}`, {params});
  }

  //TODO: Récupérer l'id du collaborateur connecté
  reserveVehicle(userId: number, reservationVehicle: ResaVehicle): Observable<string> {
    return this.http.post(`${this.apiURL}/vehicules/location/reserver`, reservationVehicle, {
      params: new HttpParams().set('userId', userId.toString()),
      responseType: 'text' // Handle response as text
    });
  }

  deleteReservationVehicle(id: number): Observable<string> {
    return this.http.delete(`${this.apiURL}/vehicules/location/supprimer/${id}`, { responseType: 'text' });
  }


}
