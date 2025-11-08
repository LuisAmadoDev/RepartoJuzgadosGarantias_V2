export interface User {
  _id?: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  active: boolean;
  password?: string;
  createdAt?: Date;
}
