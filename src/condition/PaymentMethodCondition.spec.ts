import PaymentMethodCondition from './PaymentMethodCondition';

describe('PaymentMethodCondition', () => {
  it('should be false if absent', () => {
    const condition = new PaymentMethodCondition('DEBIT');
    expect(condition.test({})).toBe(false);
  });

  it('should not match if payment method differs', () => {
    const condition = new PaymentMethodCondition('DEBIT');
    expect(
      condition.test({
        paymentMethod: 'CREDIT',
      })
    ).toBe(false);
  });

  it('should match if payment method matches', () => {
    const condition = new PaymentMethodCondition('DEBIT');
    expect(
      condition.test({
        paymentMethod: 'DEBIT',
      })
    ).toBe(true);
  });
});
