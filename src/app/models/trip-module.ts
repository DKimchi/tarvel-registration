// tslint:disable-next-line:class-name
export interface tripModule {
  whereToRegister: string;
  carName: string;
  monthBill: string;
  dateAndTime: Date;
  startKM: number;
  endKM: number;
  carPayBy: string;
  carResponsible: string;
  carNumber: string;
  collectionOfCar: string;
  numberOfPas: number;
  driver: {
    name: string;
    bill: {
      paidByOrganization: string;
      nameOfBill: string;
    };
    circleOfBelonging: string;
  };
  pas2?: {
    name: string;
    bill: {
      paidByOrganization: string;
      nameOfBill: string;
    };
    circleOfBelonging: string;
  };
  pas3?: {
    name: string;
    bill: {
      paidByOrganization: string;
      nameOfBill: string;
    };
    circleOfBelonging: string;
  };
  pas4?: {
    name: string;
    bill: {
      paidByOrganization: string;
      nameOfBill: string;
    };
    circleOfBelonging: string;
  };
  pas5?: {
    name: string;
    bill: {
      paidByOrganization: string;
      nameOfBill: string;
    };
    circleOfBelonging: string;
  };
  pas6?: {
    name: string;
    bill: {
      paidByOrganization: string;
      nameOfBill: string;
    };
    circleOfBelonging: string;
  };
  pas7?: {
    name: string;
    bill: {
      paidByOrganization: string;
      nameOfBill: string;
    };
    circleOfBelonging: string;
  };
}
