'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import { deleteUser } from '@/services/userService';
import { Toaster, toast } from 'react-hot-toast';

interface DeleteUserConfirmProps {
    userId: number | null;
    userName: string;
    onClose: () => void;
    onDelete: () => void;
}

export default function DeleteUserConfirm({ userId, userName, onClose, onDelete }: DeleteUserConfirmProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!userId) return null;

    const handleDelete = async () => {
        if (!userId) return;

        try {
            setIsDeleting(true);
            const response = await deleteUser(userId);

            if (response.success) {
                toast.success(response.message || 'User deleted successfully');
                onDelete();
            } else {
                toast.error(response.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('An unexpected error occurred');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <Modal isOpen={!!userId} onClose={onClose}>
                <div className="p-6 max-w-md mx-auto">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Delete User</h2>
                    <p className="mb-4 text-gray-600">
                        Are you sure you want to delete <span className="font-semibold">{userName}</span>?
                        This action cannot be undone.
                    </p>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
} 