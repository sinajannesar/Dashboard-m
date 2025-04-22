import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readDb, writeDb } from '@/lib/db';
import { UserApiModel, UserApiService, UserTestData } from './userform';

// Mock the database functions
vi.mock('@/lib/db', () => ({
  readDb: vi.fn(),
  writeDb: vi.fn(),
}));

describe('User API handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (readDb as any).mockResolvedValue({
      users: [UserTestData.existingUser],
    });
    (writeDb as any).mockResolvedValue(undefined);
  });

  it('should add a new user via POST', async () => {
    // Arrange
    const request = UserApiModel.createAddUserRequest(UserTestData.newUser);

    // Act
    const { status, body } = await UserApiService.addUser(request);

    // Assert
    expect(status).toBe(201);
    expect(body.user.email).toBe('reza@example.com');
    expect(writeDb).toHaveBeenCalled();
  });

  it('should update an existing user via PUT', async () => {
    // Arrange
    const request = UserApiModel.createUpdateUserRequest(UserTestData.updatedUser);

    // Act
    const { status, body } = await UserApiService.updateUser(request);

    // Assert
    expect(status).toBe(200);
    expect(body.message).toBe('User updated successfully');
    expect(writeDb).toHaveBeenCalled();
  });

  it('should delete a user via DELETE', async () => {
    // Arrange
    const request = UserApiModel.createDeleteUserRequest(1, 'ali@example.com');

    // Act
    const { status, body } = await UserApiService.deleteUser(request);

    // Assert
    expect(status).toBe(200);
    expect(body.message).toBe('User deleted successfully');
    expect(writeDb).toHaveBeenCalled();
  });

  it('should return 404 if user to update not found', async () => {
    // Arrange
    (readDb as any).mockResolvedValue({ users: [] });
    const request = UserApiModel.createUpdateUserRequest({
      id: 99,
      email: 'notfound@example.com',
    });

    // Act
    const { status, body } = await UserApiService.updateUser(request);

    // Assert
    expect(status).toBe(404);
    expect(body.message).toBe('User not found');
  });

  it('should return 400 if POST data is invalid', async () => {
    // Arrange
    const request = UserApiModel.createAddUserRequest(UserTestData.invalidUser);

    // Act
    const { status, body } = await UserApiService.addUser(request);

    // Assert
    expect(status).toBe(400);
    expect(body.message).toBe('Invalid data');
  });
});