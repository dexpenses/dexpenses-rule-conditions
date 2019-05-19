import PlaceTypeCategoryCondition from './PlaceTypeCategoryCondition';

describe('PlaceTypeCategoryCondition', () => {
  it('should be false if absent', () => {
    const condition = new PlaceTypeCategoryCondition('food');
    expect(condition.test({})).toBe(false);
  });

  it('should not match if place types is empty', () => {
    const condition = new PlaceTypeCategoryCondition('food');
    expect(
      condition.test({
        place: {
          types: [],
        } as any,
      })
    ).toBe(false);
  });

  it("should not match if place types don't contain specified type category", () => {
    const condition = new PlaceTypeCategoryCondition('food');
    expect(
      condition.test({
        place: {
          types: ['zoo'], // maps to entertainment
        } as any,
      })
    ).toBe(false);

    expect(
      condition.test({
        place: {
          types: ['synagogue'], // maps to null
        } as any,
      })
    ).toBe(false);
  });

  it('should match if place types includes specified type category', () => {
    const condition = new PlaceTypeCategoryCondition('food');
    expect(
      condition.test({
        place: {
          types: ['restaurant'],
        } as any,
      })
    ).toBe(true);

    expect(
      condition.test({
        place: {
          types: ['zoo', 'restaurant'],
        } as any,
      })
    ).toBe(true);
  });
});
