import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehicleDataService {
  immatriculation: string = '';
  nbPlaces: string = '';
  category: string = '';
  pollution: string = '';
  brand: string = '';
  model: string = '';
  motorization: string = '';
  status: string = '';

  imageUrl: string | ArrayBuffer | null | undefined;

  onUrlInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.imageUrl = input.value;
  }
}
