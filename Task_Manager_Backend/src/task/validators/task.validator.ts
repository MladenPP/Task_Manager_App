import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'DateValidator', async: false })
export class DateValidator implements ValidatorConstraintInterface {
  validate(value: Date) {
    if (!value) return false;

    return value > new Date();
  }
  defaultMessage?() {
    return `Invalid date`;
  }
}
