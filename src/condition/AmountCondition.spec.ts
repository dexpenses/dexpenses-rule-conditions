import AmountCondition from './AmountCondition';

describe('AmountCondition', () => {
  it('should be false if absent', () => {
    const condition = new AmountCondition('>', 100);
    expect(condition.test({})).toBe(false);
  });

  it('should not match >100 condition if value is below <= 100', () => {
    const condition = new AmountCondition('>', 100);
    expect(
      condition.test({
        amount: {
          value: 99,
          currency: 'EUR',
        },
      })
    ).toBe(false);
    expect(
      condition.test({
        amount: {
          value: 99.9,
          currency: 'EUR',
        },
      })
    ).toBe(false);
    expect(
      condition.test({
        amount: {
          value: 100,
          currency: 'EUR',
        },
      })
    ).toBe(false);
  });

  it('should match >100 condition if value is >100', () => {
    const condition = new AmountCondition('>', 100);
    expect(
      condition.test({
        amount: {
          value: 101,
          currency: 'EUR',
        },
      })
    ).toBe(true);
    expect(
      condition.test({
        amount: {
          value: 100.01,
          currency: 'EUR',
        },
      })
    ).toBe(true);
  });
});
