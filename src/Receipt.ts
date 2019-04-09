import { PlaceDetailsResult, GeocodingResult } from '@google/maps';
import { Time } from './Time';

export interface Address {
  city?: string;
  street?: string;
}

export default interface Receipt {
  header?: string[];
  time?: Time;
  phone?: string;
  paymentMethod?: string;
  date?: Date;
  amount?: { value: number; currency: string };
  address?: Address;
  timestamp?: Date;
  place?: GeocodingResult & PlaceDetailsResult;
}
