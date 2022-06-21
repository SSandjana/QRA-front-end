import {Role} from "./role";

export interface User {
  id: number;
  role: Role;
  firstName: string;
  lastName: string;
  idNumber: string;
  dob: Date;
  telephone: string;
  email: string;
  username: string;
  password: string;
  registrationDate: Date;
}
