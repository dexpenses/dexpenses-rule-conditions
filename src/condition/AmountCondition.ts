import Condition from './Condition';
import { Operator, parseOperator } from '../Operator';
import Receipt from '../Receipt';

export default class AmountCondition implements Condition {
  private cmp: (x: number, y: number) => boolean;

  constructor(op: Operator, private value: number) {
    this.cmp = parseOperator(op);
  }

  test(receipt: Receipt): boolean {
    return !!receipt.amount && this.cmp(receipt.amount.value, this.value);
  }
}
