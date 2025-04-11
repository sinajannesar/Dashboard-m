import { fetchUsers } from '@/services/useerservis';
import ClientUsersList from './ClientUsersList';

export default async function Page() {
  const initialUsers = await fetchUsers();

  return <ClientUsersList initialUsers={initialUsers} />;
}