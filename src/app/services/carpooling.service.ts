import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {Carpooling} from "@models/carpooling.model";
import CarpoolingData from "@components/covoiturage-form/CarpoolingData";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "@services/auth.service";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {
 private readonly apiURL = `${environment.api}/carpoolings`;
  constructor(private readonly http: HttpClient,
              private readonly authService:AuthService) {}

  insertCarpooling(carpooling: CarpoolingData): Observable<any> {
    return this.http.post(`${this.apiURL}`, carpooling);
  }
  getCarpoolingsForParticipants(): Observable<Carpooling[]> {
    return this.http.get<Carpooling[]>(`${this.apiURL}/participant/${this.authService.getUserId()}`);
  }

  removeParticipant(idCarpooling: number, idParticipant: number): Observable<string> {
    const params = new HttpParams()
      .set('idCarpooling', idCarpooling.toString())
      .set('idParticipant', idParticipant.toString());

    return this.http.delete<string>(
      `${this.apiURL}/participant`,
      {
        params,
        responseType: 'text' as 'json'
      }
    );
  }
}
