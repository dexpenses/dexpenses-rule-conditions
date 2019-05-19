import CurrencyCondition from './CurrencyCondition';

describe('CurrencyCondition', () => {
  it('should be false if absent', () => {
    const condition = new CurrencyCondition('EUR');
    expect(condition.test({})).toBe(false);
  });

  it('should not match if currency differs', () => {
    const condition = new CurrencyCondition('EUR');
    expect(
      condition.test({
        amount: {
          value: 1,
          currency: 'USD',
        },
      })
    ).toBe(false);
  });

  it('should match if currency matches', () => {
    const condition = new CurrencyCondition('EUR');
    expect(
      condition.test({
        amount: {
          value: 1,
          currency: 'EUR',
        },
      })
    ).toBe(true);
  });
});
