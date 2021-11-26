import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate');
    const endDate = control.get('endDate');

    return startDate &&
      endDate &&
      new Date(startDate.value) > new Date(endDate.value)
      ? null
      : { invalidDateRange: 'start date must be greater than end date' };
  };
}
