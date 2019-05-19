import { Receipt } from '@dexpenses/core';

export default interface Condition {
  test(receipt: Receipt): boolean;
}
