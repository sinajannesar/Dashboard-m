import { NextRequest } from 'next/server';
import { createRequest } from 'node-mocks-http';
import { POST, PUT, DELETE } from '../../../src/app/api/users/route';

export class UserApiModel {
  static createAddUserRequest(userData: {
    first_name: string;
    last_name?: string;
    email: string;
    avatar?: string;
    phonenumber?: string;
    password?: string;
  }) {

    if (userData.first_name === undefined || userData.email === undefined) {
      throw new Error('First name and email fields are required');
    }

    const request = createRequest({
      method: 'POST',
      body: userData,
    });

    Object.defineProperty(request, 'json', {
      value: () => Promise.resolve(userData),
      writable: true,
    });

    return request as unknown as NextRequest;
  }

  static createUpdateUserRequest(userData: {
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    avatar?: string;
    phonnumber?: string;
    password?: string;
  }) {
    if (userData.id === undefined || userData.email === undefined) {
      throw new Error('ID and email fields are required for update');
    }

    const request = createRequest({
      method: 'PUT',
      body: userData,
    });

    Object.defineProperty(request, 'json', {
      value: () => Promise.resolve(userData),
      writable: true,
    });

    return request as unknown as NextRequest;
  }

  static createDeleteUserRequest(userId: number, email: string) {
    if (userId === undefined || email === undefined) {
      throw new Error('User ID and email fields are required for deletion');
    }

    const request = createRequest({
      method: 'DELETE',
      body: { id: userId, email },
    });

    Object.defineProperty(request, 'json', {
      value: () => Promise.resolve({ id: userId, email }),
      writable: true,
    });

    return request as unknown as NextRequest;
  }
}


export class UserApiService {
  static async addUser(request: NextRequest) {
    try {
      const response = await POST(request);
      return {
        status: response.status,
        body: await response.json(),
      };
    } catch (error: any) {
      return {
        status: 500,
        body: { message: error.message || 'Internal Server Error' },
      };
    }
  }

  static async updateUser(request: NextRequest) {
    try {
      const response = await PUT(request);
      return {
        status: response.status,
        body: await response.json(),
      };
    } catch (error: any) {
      return {
        status: 500,
        body: { message: error.message || 'Internal Server Error' },
      };
    }
  }

  static async deleteUser(request: NextRequest) {
    try {
      const response = await DELETE(request);
      return {
        status: response.status,
        body: await response.json(),
      };
    } catch (error: any) {
      return {
        status: 500,
        body: { message: error.message || 'Internal Server Error' },
      };
    }
  }
}


export const UserTestData = {
  existingUser: {
    id: 1,
    first_name: 'Ali',
    last_name: 'Ahmadi',
    email: 'ali@example.com',
    avatar: '',
    phonenumber: '09120000000',
    password: '1234',
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  newUser: {
    first_name: 'Reza',
    last_name: 'Hosseini',
    email: 'reza@example.com',
  },
  updatedUser: {
    id: 1,
    first_name: 'AliUpdated',
    last_name: 'AhmadiUpdated',
    email: 'ali@example.com',
    phonnumber: '09120001111',
  },
  invalidUser: {
    first_name: '',
    email: '',
  },
};