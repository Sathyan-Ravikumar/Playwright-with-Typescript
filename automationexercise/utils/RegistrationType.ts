export type RegistrationData = {
  title: 'Mr' | 'Mrs';
  password: string;
  day: string;
  month: string;
  year: string;
  subscribeNewsletter?: boolean;
  receiveOffers?: boolean;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};