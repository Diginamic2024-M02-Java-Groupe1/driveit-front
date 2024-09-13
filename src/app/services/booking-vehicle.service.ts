import {Injectable} from '@angular/core';
import {environment} from "@env/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResaVehicle} from "@models/resa-vehicle.model";
import {StatusFilter} from "@models/enums/status-filter.enum";


@Injectable({
  providedIn: 'root'
})
export class BookingVehicleService {

  private apiURL = environment.api;

  constructor(private http: HttpClient) {
  }

  getAvailableVehicles(dateTimeStart: string, dateTimeEnd: string): Observable<ResaVehicle[]> {
    let params = new HttpParams()
      .set('dateStart', dateTimeStart)
      .set('dateEnd', dateTimeEnd);
    return this.http.get<ResaVehicle[]>(`${this.apiURL}/vehicles/rental/reserve`, {params});
  }

  getMyReservations(statusChoice: StatusFilter): Observable<ResaVehicle[]> {
    let params = new HttpParams()
      .set('status', statusChoice);
    return this.http.get<ResaVehicle[]>(`${this.apiURL}/vehicles/rental/my-reservations`, {params});
  }

  getAllReservationsForThisVehicle(vehicleId: number): Observable<ResaVehicle[]> {
    let params = new HttpParams()
      .set('vehicleId', vehicleId);
    return this.http.get<ResaVehicle[]>(`${this.apiURL}/vehicles/rental/vehicle-reservations`, {params});
  }

  reserveVehicle(reservationVehicle: ResaVehicle): Observable<string> {
    return this.http.post(`${this.apiURL}/vehicles/rental/reserve`, reservationVehicle, {
      responseType: 'text'
    });
  }

  updateReservationVehicle(id:number,reservationVehicle: ResaVehicle): Observable<string> {
    return this.http.put(`${this.apiURL}/vehicles/rental/reserve/${id}`, reservationVehicle, {
      responseType: 'text'
    });
  }

  deleteReservationVehicle(id: number): Observable<string> {
    return this.http.delete(`${this.apiURL}/vehicles/rental/reserve/${id}`, { responseType: 'text' });
  }


}
