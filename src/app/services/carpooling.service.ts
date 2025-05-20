import { Injectable } from '@angular/core';
import {environment} from "@env/environment";
import {Carpooling} from "@models/carpooling.model";
import CarpoolingData from "@components/covoiturage-form/CarpoolingData";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {
  private apiURL = environment.api;
  constructor(private http: HttpClient) {}

  insertCarpooling(carpooling: CarpoolingData): Observable<any> {
    return this.http.post(`${this.apiURL}/carpoolings`, carpooling);
  }
}
