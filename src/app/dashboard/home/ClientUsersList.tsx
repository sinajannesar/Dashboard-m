'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { User } from '@/types/types';
import Modal from '@/components/ui/modal';
import EditUserForm from '@/components/cruduser/EditUserForm';
import DeleteUserConfirm from '@/components/cruduser/DeleteUserConfirm';
import UserCard from '@/components/users/UserCard';
import EmptyState from '@/components/users/EmptyState';

interface ClientUsersListProps {
    initialUsers: User[];
}

export default function ClientUsersList({ initialUsers }: ClientUsersListProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
    const [deletingUserName, setDeletingUserName] = useState('');

    const handleEditClick = (userId: number) => {
        setEditingUserId(userId);
    };

    const handleDeleteClick = (userId: number, userName: string) => {
        setDeletingUserId(userId);
        setDeletingUserName(userName);
    };

    const handleSaveUser = async () => {
        setEditingUserId(null);
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error('Error refreshing users:', error);
        }
    };

    const handleDeleteUser = async () => {
        setDeletingUserId(null);
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error('Error refreshing users:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">User List</h1>
                <Link
                    href="/dashboard/users/addprofile"
                    className="mt-4 sm:mt-0 bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 font-semibold text-sm sm:text-base"
                >
                    Add User
                </Link>
            </div>

            {users.length === 0 ? (
                <EmptyState />
            ) : (
                // ...rest of the UI code
                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {users.map((user) => (
                        <Suspense key={user.id} fallback={<div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>}>
                            <UserCard
                                user={user}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                            />
                        </Suspense>
                    ))}
                </div>
            )}

            <Modal
                isOpen={!!editingUserId}
                onClose={() => setEditingUserId(null)}
                title="Edit User"
            >
                {editingUserId && (
                    <EditUserForm
                        userId={editingUserId}
                        onSave={handleSaveUser}
                        onCancel={() => setEditingUserId(null)}
                    />
                )}
            </Modal>

            <Modal
                isOpen={!!deletingUserId}
                onClose={() => setDeletingUserId(null)}
                title="Delete User"
            >
                {deletingUserId && (
                    <DeleteUserConfirm
                        userId={deletingUserId}
                        userName={deletingUserName}
                        onDelete={handleDeleteUser}
                        onCancel={() => setDeletingUserId(null)}
                    />
                )}
            </Modal>
        </div>
    );
}
