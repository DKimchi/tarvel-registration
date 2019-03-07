import { tripModule } from './trip-module';

// tslint:disable-next-line:class-name
export interface carModule {
  name: string;
  typeOfCar: string;
  responsible: string;
  payment: string;
  lastRegister: string;
  lastTrip: tripModule;
  // tslint:disable-next-line:ban-types
  currentTrip: Object;
  sevenPasCar: boolean;
  carNumber: string;
  code: string;
  registerOn: string;
  collectionOfCar: string;
  rentCompany: {
    name: string;
    tel: string;
  };
}
