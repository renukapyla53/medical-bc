export interface User {
  id: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
  name: string;
}

export const login = async (email: string, password: string): Promise<User> => {
 const res = await fetch('https://medical-bc.onrender.com/api/auth/login', {
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

  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return {
    ...data.user,
    id: String(data.user.id),
    password: ''
  };
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('user');

  if (!user) return null;

  const parsedUser = JSON.parse(user);

  return {
    ...parsedUser,
    id: String(parsedUser.id),
    password: ''
  };
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};