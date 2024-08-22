export enum ProfessionEnum {
  Student = "student",
  Working = "working",
}
export interface IUserInstance {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profession?: ProfessionEnum;
  phoneNumber?: string;
  createdAt: string;
}
