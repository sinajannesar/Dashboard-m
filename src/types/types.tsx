
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt?: string;
};

export interface Database {
  users: UserData[];
};