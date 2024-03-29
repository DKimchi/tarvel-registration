import { tripModule } from './trip-module';

// tslint:disable-next-line:class-name
export interface carModule {
  openRegistration: Date;
  whereToRegister: string;
  name: string;
  displayName?: string;
  typeOfCar: string;
  typename: string;
  responsible: string;
  carPayBy: string;
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
  permissibletoDrive: string;
  startKMinFleet?: number;
  occasional?: {
    startDateInFleet: Date;
    endDateInFleet: Date;
    startKMinFleet: number;
    endKMinFleet: number;
  };
  replacement?: {
    replacingCarCollection: string;
    active: boolean;
    replacingCar: string;
    startDateInFleet: Date;
    endDateInFleet: Date;
    startKMinFleet: number;
    endKMinFleet: number;
  };
}
