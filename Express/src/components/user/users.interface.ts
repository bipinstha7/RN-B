export interface IUser {
  _id: string;
  email: string;
}

export interface IUserModal extends IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}
