import { DateTime } from 'luxon';
import Condition from './Condition';
import { Operator, parseOperator } from './Operator';
import Receipt from './Receipt';

export default class DateCondition implements Condition {
  private cmp: (x: number, y: number) => boolean;

  constructor(
    private dateField: keyof DateTime,
    op: Operator,
    private value: number
  ) {
    this.cmp = parseOperator(op);
  }

  test(receipt: Receipt): boolean {
    if (!receipt.date) {
      return false;
    }
    const dt = DateTime.fromJSDate(receipt.date, {
      zone: 'Europe/Berlin',
    });
    const field = dt[this.dateField];
    if (!field) {
      throw new Error('unknown date time field: ' + this.dateField);
    }
    if (typeof field !== 'number') {
      throw new Error('not a numeric field: ' + this.dateField);
    }
    return this.cmp(field, this.value);
  }
}
