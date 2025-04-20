import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dispatch, SetStateAction } from 'react';

interface EditDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  editData: {
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
  };
  setEditData: Dispatch<SetStateAction<any>>;
  onSave: () => void;
}

export function EditDialog({ open, setOpen, editData, setEditData, onSave }: EditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen} aria-labelledby="edit-dialog-title" aria-describedby="edit-dialog-description">
      <DialogContent>
        <DialogHeader>
          <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4" id="edit-dialog-description">
          <p>Edit the user information below:</p>
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              value={editData.first_name}
              onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              value={editData.last_name}
              onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Avatar URL</Label>
            <Input
              value={editData.avatar}
              onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: () => void;
}

export function DeleteDialog({ open, setOpen, onDelete }: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen} aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
      <DialogContent>
        <DialogHeader>
          <DialogTitle id="delete-dialog-title">Delete User</DialogTitle>
        </DialogHeader>
        <p id="delete-dialog-description">Are you sure you want to delete this user?</p>
        <DialogFooter>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
