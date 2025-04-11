export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}

export interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  phonenumber: string;
  email: string;
  password: string;

  createdAt: string;
  updatedAt?: string;
};

export interface Database {
  users: UserData[];
};

export interface EditUserFormProps {
  userId: number;
  onSave: () => void;
  onCancel: () => void;
}

export interface DeleteUserConfirmProps {
  userId: number;
  userName: string;
  onDelete: () => void;
  onCancel: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}