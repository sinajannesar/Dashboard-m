import React from 'react';
import Modal from '@/components/ui/modal';
import dynamic from 'next/dynamic';

const DeleteUserConfirm = dynamic(() => import('@/components/cruduser/DeleteUserConfirm'));

interface DeleteUserModalProps {
    deletingUserId: number | null;
    deletingUserName: string;
    onClose: () => void;
    onDelete: () => Promise<void>;
}

export default function DeleteUserModal({
    deletingUserId,
    deletingUserName,
    onClose,
    onDelete,
}: DeleteUserModalProps) {
    return (
        <Modal isOpen={!!deletingUserId} onClose={onClose} title="Delete User">
            {deletingUserId && (
                <DeleteUserConfirm
                    userId={deletingUserId}
                    userName={deletingUserName}
                    onDelete={onDelete}
                    onCancel={onClose}
                />
            )}
        </Modal>
    );
}