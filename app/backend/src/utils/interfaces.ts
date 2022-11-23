export default interface ILogin {
  email: string,
  password: string;
  id?: number
}

export interface IUserMock {
  id: number;
  username: string;
  role: string;
  email: string
  password: string;
}
