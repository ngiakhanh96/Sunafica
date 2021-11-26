import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate');
    const endDate = control.get('endDate');

    return startDate &&
      endDate &&
      new Date(startDate.value) < new Date(endDate.value)
      ? null
      : <DateRangeValidationErrors>{
          invalidDateRange: 'end date must be greater than start date',
        };
  };
}

export enum DateRangeError {
  InvalidDateRange = 'invalidDateRange',
}

declare type DateRangeValidationErrors = {
  [key in DateRangeError]: string;
};
