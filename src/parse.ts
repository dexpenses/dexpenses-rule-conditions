import AndCondition from './condition/bool/AndCondition';
import OrCondition from './condition/bool/OrCondition';
import NotCondition from './condition/bool/NotCondition';
import HeaderCondition from './condition/HeaderCondition';
import AmountCondition from './condition/AmountCondition';
import CurrencyCondition from './condition/CurrencyCondition';
import DateCondition from './condition/DateCondition';
import TimeCondition from './condition/TimeCondition';
import PaymentMethodCondition from './condition/PaymentMethodCondition';
import { Time } from './Time';

function parseTime(timeString: string): Time {
  const [hour, minute, second] = timeString.split(':');
  return {
    hour: parseInt(hour, 10),
    minute: parseInt(minute, 10),
    second: !second ? undefined : parseInt(second, 10),
  };
}

export function parseCondition(json: any) {
  const [key, value]: [string, any] = Object.entries(json)[0];
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
      return new TimeCondition(parseTime(tn), type);
    default:
      throw new Error('unknown key: ' + key);
  }
}
