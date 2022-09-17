export interface IUserRegister {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isAdmin: number;
}

export interface IUserLogin {
  username: string;
  password: string;
}
