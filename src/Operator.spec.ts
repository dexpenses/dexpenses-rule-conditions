import { parseOperator, Operator } from './Operator';

describe('Operator parse', () => {
  it('should throw error for invalid operator', () => {
    expect(() => parseOperator(':' as any)).toThrowError(/unknown operator/);
  });

  it('should throw error for missing', () => {
    expect(() => parseOperator(null as any)).toThrowError(/unknown operator/);
    expect(() => parseOperator(undefined as any)).toThrowError(
      /unknown operator/
    );
  });

  it.each([
    ['<', 1 < 2, 2 < 2, 2 < 1],
    ['<=', 1 <= 2, 2 <= 2, 2 <= 1],
    ['==', false /* 1 == 2*/, 2 === 2, false /* 2 == 1 */],
    ['>=', 1 >= 2, 2 >= 2, 2 >= 1],
    ['>', 1 > 2, 2 > 2, 2 > 1],
  ])('should correctly parse "%s"', (op, oneTwo, twoTwo, twoOne) => {
    expect(parseOperator(op as Operator)(1, 2)).toBe(oneTwo);
    expect(parseOperator(op as Operator)(2, 2)).toBe(twoTwo);
    expect(parseOperator(op as Operator)(2, 1)).toBe(twoOne);
  });
});
