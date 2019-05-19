import PlaceTypeCondition from './PlaceTypeCondition';

describe('PlaceTypeCondition', () => {
  it('should be false if absent', () => {
    const condition = new PlaceTypeCondition('store');
    expect(condition.test({})).toBe(false);
  });

  it('should not match if place types is empty', () => {
    const condition = new PlaceTypeCondition('store');
    expect(
      condition.test({
        place: {
          types: [],
        } as any,
      })
    ).toBe(false);
  });

  it("should not match if place types don't contain specified type", () => {
    const condition = new PlaceTypeCondition('store');
    expect(
      condition.test({
        place: {
          types: ['zoo'],
        } as any,
      })
    ).toBe(false);
  });

  it('should match if place types includes specified type', () => {
    const condition = new PlaceTypeCondition('store');
    expect(
      condition.test({
        place: {
          types: ['store'],
        } as any,
      })
    ).toBe(true);

    expect(
      condition.test({
        place: {
          types: ['zoo', 'store'],
        } as any,
      })
    ).toBe(true);
  });
});
