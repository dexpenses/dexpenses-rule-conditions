import Condition from './Condition';
import Receipt from '../Receipt';
import placeTypes from '../place-types';

export default class PlaceTypeCategoryCondition implements Condition {
  constructor(private placeTypeCategory: string) {}

  test(receipt: Receipt): boolean {
    if (!receipt.place) {
      return false;
    }
    return receipt.place.types
      .map((pt) => placeTypes[pt])
      .includes(this.placeTypeCategory);
  }
}
