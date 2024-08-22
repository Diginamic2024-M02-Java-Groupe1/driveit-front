import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Vehicle} from "@models/vehicle";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "@env/environment";
import {AuthService} from "@services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class VehicleDataService {
  private apiURL = environment.api;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  insertVehicle(vehicle: Vehicle): Observable<Vehicle> {
    // const headers = { 'Authorization': `Bearer ${this.authService.getToken()}` }; // Add token to headers if needed
    return this.http.post<Vehicle>(`${this.apiURL}/vehicule/service`, vehicle)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
