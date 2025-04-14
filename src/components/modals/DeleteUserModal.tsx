import React, { useEffect, useRef } from 'react';
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
    // استفاده از useRef برای ذخیره‌ آخرین مقدار deletingUserId
    const prevUserIdRef = useRef<number | null>(null);

    // این useEffect فقط وقتی deletingUserId تغییر کند اجرا می‌شود
    useEffect(() => {
        // فقط زمانی لاگ میزنیم که deletingUserId واقعاً تغییر کرده باشد
        if (prevUserIdRef.current !== deletingUserId) {
            console.log(`DeleteUserModal - User ID: ${deletingUserId}, Type: ${typeof deletingUserId}`);
            prevUserIdRef.current = deletingUserId;
        }
    }, [deletingUserId]);

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