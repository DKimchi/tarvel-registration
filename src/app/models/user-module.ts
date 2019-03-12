// tslint:disable-next-line:class-name
export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  defaultCollectionOfCar?: string;
  mainBills?: Array<string>;
  circleOfBelonging?: string;
  constTrips?: Array<object>;
  children?: Array<string>;
}