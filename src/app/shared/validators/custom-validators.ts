import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators extends Validators {
    static onlyNumbers(control: AbstractControl): ValidationErrors | null {
        return /^\d+$/.test(control.value) ? null : { onlyNumbers: true };
    }

    static mustBeEqual(firstControlName: string, secondControlName: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const firstControl = group.get(firstControlName);
            const secondControl = group.get(secondControlName);
            return firstControl?.value === secondControl?.value ? null : { mustBeEqual: true };
        };
    }

    static atLeastOneNumber(control: AbstractControl): ValidationErrors | null {
        return /\d+/.test(control.value) ? null : { toNumber: true };
    }

    static isValidEmail(control: AbstractControl): ValidationErrors | null {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        return emailPattern.test(control.value) ? null : { isValidEmail: true };
    }

    static atLeastOneUppercase(control: AbstractControl): ValidationErrors | null {
        return /[A-Z]+/.test(control.value) ? null : { atLeastOneUppercase: true };
    }

    static mustBeDifferent(firstField: string, secondField: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const firstControl = group.get(firstField);
            const secondControl = group.get(secondField);
            return firstControl?.value != secondControl?.value ? null : { mustBeDifferent: true };
        };
    }
}