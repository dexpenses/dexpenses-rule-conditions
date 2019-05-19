import Condition from './Condition';
import { Receipt, applyPlaceTypeMappings } from '@dexpenses/core';

export default class PlaceTypeCategoryCondition implements Condition {
  constructor(private placeTypeCategory: string) {}

  test(receipt: Receipt): boolean {
    if (!receipt.place) {
      return false;
    }
    return applyPlaceTypeMappings(receipt.place.types).has(
      this.placeTypeCategory
    );
  }
}
