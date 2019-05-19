import AndCondition from './condition/bool/AndCondition';
import OrCondition from './condition/bool/OrCondition';
import NotCondition from './condition/bool/NotCondition';
import HeaderCondition from './condition/HeaderCondition';
import AmountCondition from './condition/AmountCondition';
import CurrencyCondition from './condition/CurrencyCondition';
import DateCondition from './condition/DateCondition';
import TimeCondition from './condition/TimeCondition';
import PaymentMethodCondition from './condition/PaymentMethodCondition';
import { Time } from '@dexpenses/core';
import PlaceTypeCondition from './condition/PlaceTypeCondition';
import PlaceTypeCategoryCondition from './condition/PlaceTypeCategoryCondition';

export function parseCondition(json: any) {
  const entries = Object.entries(json);
  if (entries.length === 0) {
    throw new Error('Expected condition but got {}');
  }
  if (entries.length > 1) {
    throw new Error('Condition can only have a single entry');
  }
  const [key, value]: [string, any] = entries[0];
  switch (key) {
    case '$and':
      return new AndCondition(value.map(parseCondition));
    case '$or':
      return new OrCondition(value.map(parseCondition));
    case '$not':
      return new NotCondition(parseCondition(value));
    case 'header':
      const [searchString, caseSensitive] = value;
      return new HeaderCondition(searchString, caseSensitive);
    case 'amount':
      const [aop, n] = value;
      return new AmountCondition(aop, n);
    case 'currency':
      return new CurrencyCondition(value);
    case 'paymentMethod':
      return new PaymentMethodCondition(value);
    case 'date':
      const [dateField, dop, dn] = value;
      return new DateCondition(dateField, dop, dn);
    case 'time':
      const [type, tn] = value;
      return new TimeCondition(Time.parse(tn), type);
    case 'placeType':
      return new PlaceTypeCondition(value);
    case 'placeTypeCategory':
      return new PlaceTypeCategoryCondition(value);
    default:
      throw new Error('unknown key: ' + key);
  }
}
