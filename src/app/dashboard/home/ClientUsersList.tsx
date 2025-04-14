'use client';

import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { User } from '@/types/types';
import EmptyState from '@/components/users/EmptyState';
import UserList from '@/components/users/UserList';
import EditUserModal from '@/components/modals/EditUserModal';
import DeleteUserModal from '@/components/modals/DeleteUserModal';
import { fetchCombinedUsers } from '@/services/userService';

interface ClientUsersListProps {
    initialUsers: User[];
}

export default function ClientUsersList({ initialUsers }: ClientUsersListProps) {
    // State
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
    const [deletingUserName, setDeletingUserName] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    // بازیابی کاربران
    const refreshUsers = useCallback(async () => {
        try {
            setIsRefreshing(true);
            const result = await fetchCombinedUsers();
            if (result.users) setUsers(result.users);
        } catch {
            if (users.length === 0) setUsers(initialUsers);
        } finally {
            setIsRefreshing(false);
        }
    }, [initialUsers, users.length]);

    // بازیابی خودکار
    useEffect(() => {
        if (!isRefreshing && users.length === 0) refreshUsers();
    }, [refreshUsers, isRefreshing, users.length]);

    // مدیریت ویرایش و حذف
    const handleEditClick = useCallback((userId: number) => setEditingUserId(userId), []);
    const handleDeleteClick = useCallback((userId: number, userName: string) => {
        if (userId !== deletingUserId) {
            setDeletingUserId(userId);
            setDeletingUserName(userName);
        }
    }, [deletingUserId]);

    // اتمام عملیات
    const handleSaveUser = useCallback(async () => {
        setEditingUserId(null);
        await refreshUsers();
    }, [refreshUsers]);

    const handleDeleteUser = useCallback(async () => {
        setDeletingUserId(null);
        await refreshUsers();
    }, [refreshUsers]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">User List</h1>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <button
                        onClick={refreshUsers}
                        disabled={isRefreshing}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <Link
                        href="/dashboard/users/addprofile"
                        className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 font-semibold text-sm sm:text-base"
                    >
                        Add User
                    </Link>
                </div>
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
