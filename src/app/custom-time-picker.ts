import {OwlDateTimeIntl} from "@danielmoncada/angular-datetime-picker";
export class CustomTimePicker extends OwlDateTimeIntl{

  /** A label for the cancel button */
  override cancelBtnLabel= 'Annuler';
  /** A label for the set button */
  override setBtnLabel = 'Ajouter';
}

