export interface User {
  id: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
  name: string;
}

export const login = async (email: string, password: string): Promise<User> => {
  const res = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return {
    ...data.user,
    id: String(data.user.id)
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

  return JSON.parse(user);
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('currentUser');
};