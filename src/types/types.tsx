export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  phonenumber: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  updatedAt?: string;
};

export interface Database {
  users: UserData[];
};