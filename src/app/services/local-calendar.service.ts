import { Injectable } from '@angular/core';
import {PrimeNG} from "primeng/config";

@Injectable({
  providedIn: 'root'
})
export class LocalCalendarService {

  constructor(private readonly primengConfig: PrimeNG) {}

  setFrenchLocale(): void {
    this.primengConfig.setTranslation({
      dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      monthNamesShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"],
      today: 'Aujourd\'hui',
      clear: 'Effacer'
    });
  }
}
