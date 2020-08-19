import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface IIsvalid {
  valid: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ConfirmPassword {
  public ValidateConfirmPassword(control: AbstractControl): IIsvalid {
    if (!control.root.value) {
      return null;
    }
    if (control.value === control.root.value.password) {
      return null;
    } else {
      return { valid: true };
    }
  }
}
