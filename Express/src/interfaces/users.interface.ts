export interface IUser {
  _id: string;
  email: string;
}

export interface IUserModal extends IUser {
  password: string;
}
