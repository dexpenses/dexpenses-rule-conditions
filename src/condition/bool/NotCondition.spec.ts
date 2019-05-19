import Condition from '../Condition';
import { Receipt } from '@dexpenses/core';
import NotCondition from './NotCondition';

class AlwaysTrueCondition implements Condition {
  test(receipt: Receipt): boolean {
    return true;
  }
}

describe('NotCondition', () => {
  it('should negate the condition', () => {
    expect(new NotCondition(new AlwaysTrueCondition()).test({})).toBe(false);
  });
});
