import Receipt from './Receipt';

export default interface Condition {
  test(receipt: Receipt): boolean;
}
