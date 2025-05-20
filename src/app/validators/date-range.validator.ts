import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDateTime = control.get('startDateTime')?.value;
    const endDateTime = control.get('endDateTime')?.value;

    if (startDateTime && endDateTime && endDateTime <= startDateTime) {
      return { dateRangeInvalid: true };
    }
    return null;
  };
}
