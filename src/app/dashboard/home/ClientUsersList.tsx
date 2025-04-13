'use client';

import Link from 'next/link';
import { useState } from 'react';
import { User } from '@/types/types';
import EmptyState from '@/components/users/EmptyState';
import UserList from '@/components/users/UserList';
import EditUserModal from '@/components/modals/EditUserModal';
import DeleteUserModal from '@/components/modals/DeleteUserModal';

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
                <UserList users={users} onEdit={handleEditClick} onDelete={handleDeleteClick} />
            )}

            <EditUserModal
                editingUserId={editingUserId}
                onClose={() => setEditingUserId(null)}
                onSave={handleSaveUser}
            />

            <DeleteUserModal
                deletingUserId={deletingUserId}
                deletingUserName={deletingUserName}
                onClose={() => setDeletingUserId(null)}
                onDelete={handleDeleteUser}
            />
        </div>
    );
}
