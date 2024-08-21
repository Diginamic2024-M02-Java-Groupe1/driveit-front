import {OwlDateTimeIntl} from "@danielmoncada/angular-datetime-picker";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomTimePicker extends OwlDateTimeIntl{

  /** A label for the cancel button */
  override cancelBtnLabel= 'Annuler';
  /** A label for the set button */
  override setBtnLabel = 'Ajouter';
}

