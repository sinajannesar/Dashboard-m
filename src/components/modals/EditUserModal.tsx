import React from 'react';
import Modal from '@/components/ui/modal';
import dynamic from 'next/dynamic';

const EditUserForm = dynamic(() => import('@/components/cruduser/EditUserForm'));

interface EditUserModalProps {
    editingUserId: number | null;
    onClose: () => void;
    onSave: () => Promise<void>;
}

export default function EditUserModal({ editingUserId, onClose, onSave }: EditUserModalProps) {
    return (
        <Modal isOpen={!!editingUserId} onClose={onClose} title="Edit User">
            {editingUserId && (
                <EditUserForm userId={editingUserId} onSave={onSave} onCancel={onClose} />
            )}
        </Modal>
    );
}