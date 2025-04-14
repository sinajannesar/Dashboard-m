// src/components/users/DeleteUserConfirm.tsx

import React, { useState, useCallback } from 'react';
import { DeleteUserConfirmProps } from '@/types/types';
import { deleteUser } from '@/services/userService';

export default function DeleteUserConfirm({
  userId,
  userName,
  onDelete,
  onCancel
}: DeleteUserConfirmProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = useCallback(async () => {
    if (!userId) {
      setError('User ID is required');
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteUser(userId);

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete user');
      }

      await onDelete();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not delete user at this time');
    } finally {
      setIsDeleting(false);
    }
  }, [userId, onDelete]);

  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <svg
          className="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <div className="mt-3 text-center sm:mt-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Delete User
        </h3>
        <div className="mt-2">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <p className="text-gray-500">
              Are you sure you want to delete {userName}? This action cannot be undone.
            </p>
          )}
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}