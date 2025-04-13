import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { UserListProps } from '@/types/types';

// Lazy load UserCard
const UserCard = dynamic(() => import('@/components/users/UserCard'));

export default function UserList({ users, onEdit, onDelete }: UserListProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {users.map((user) => (
                <Suspense key={user.id} fallback={<div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>}>
                    <UserCard user={user} onEdit={onEdit} onDelete={onDelete} />
                </Suspense>
            ))}
        </div>
    );
}