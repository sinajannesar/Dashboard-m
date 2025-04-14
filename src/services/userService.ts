// سرویس مدیریت کاربران

export async function deleteUser(
  userId: number | string
): Promise<{ success: boolean; message?: string; error?: string }> {
  if (!userId && userId !== 0)
    return { success: false, error: 'User ID is required' };

  try {
    const res = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json().catch(() => ({ error: 'Invalid response' }));

    if (!res.ok && res.status !== 404) {
      return await deleteAlternative(userId);
    }

    return res.ok
      ? { success: true, message: data.message || 'User deleted successfully' }
      : { success: false, error: data.error || `Error ${res.status}` };
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : `Failed to delete user: ${userId}`,
    };
  }
}

// روش جایگزین با POST
async function deleteAlternative(
  userId: number | string
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch('/api/users/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json().catch(() => ({ error: 'Invalid response' }));
    return res.ok
      ? { success: true, message: data.message || 'User deleted successfully' }
      : { success: false, error: data.error || `Error ${res.status}` };
  } catch {
    return { success: false, error: 'Failed to connect to server' };
  }
}

export async function getUserById(
  userId: number | string
): Promise<{ user?: any; error?: string }> {
  if (!userId) return { error: 'User ID is required' };

  try {
    const res = await fetch(`/api/users?id=${userId}`);
    if (!res.ok) return { error: 'Failed to fetch user' };

    const data = await res.json();
    return data && (data.user || !data.error)
      ? { user: data.user || data }
      : { error: 'User not found' };
  } catch {
    return { error: 'Failed to fetch user data' };
  }
}

export async function getAllUsers(): Promise<{
  users?: any[];
  error?: string;
}> {
  try {
    const res = await fetch('/api/users');
    if (!res.ok) return { error: 'Failed to fetch users' };

    const data = await res.json();
    return Array.isArray(data)
      ? { users: data }
      : data && Array.isArray(data.users)
      ? { users: data.users }
      : { error: 'Invalid data format' };
  } catch {
    return { error: 'Failed to fetch users' };
  }
}

// دریافت ترکیبی کاربران از API خارجی و محلی
export async function fetchCombinedUsers(): Promise<{
  users?: any[];
  error?: string;
}> {
  try {
    // کاربران API خارجی
    const apiResponse = await fetch('https://reqres.in/api/users');
    if (!apiResponse.ok) return { error: 'Failed to fetch from external API' };

    const externalUsers = (await apiResponse.json()).data || [];

    // کاربران محلی
    const { users: localUsers = [], error } = await getAllUsers();
    if (error) return { error };

    // ترکیب و حذف تکراری‌ها
    return {
      users: [...externalUsers, ...localUsers].filter(
        (user, index, self) => index === self.findIndex(u => u.id === user.id)
      ),
    };
  } catch {
    return { error: 'Failed to fetch users' };
  }
}
