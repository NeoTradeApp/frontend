import { getUsers, getUserById } from '../api/services/authService';

export const login = async () => {
  try {
    const response = await loginApi();
    return response.data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
