import Condition from './Condition';
import Receipt from './Receipt';

export default class PlaceTypeCondition implements Condition {
  constructor(private placeType: string) {}

  test(receipt: Receipt): boolean {
    if (!receipt.place) {
      return false;
    }
    return receipt.place.types.includes(this.placeType as any);
  }
}
