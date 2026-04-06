export interface User {
  id: string;
  email: string;
  password?: string;
  role: 'student' | 'admin';
  name: string;
}

export const login = async (email: string, password: string): Promise<User> => {
  const API_URL = import.meta.env.VITE_API_URL;

  if (!API_URL) {
    throw new Error('VITE_API_URL is missing in .env file');
  }

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  let data: any = {};

  try {
    data = await res.json();
  } catch (error) {
    throw new Error('Invalid response from server');
  }

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  if (!data.user) {
    throw new Error('User data not found in response');
  }

  return {
    id: String(data.user.id),
    email: data.user.email,
    name: data.user.name,
    role: data.user.role,
    password: data.user.password,
  };
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('currentUser');

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    localStorage.removeItem('currentUser');
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('currentUser');
};