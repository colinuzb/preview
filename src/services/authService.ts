interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (credentials.username.length < 3) {
      return {
        success: false,
        message: 'Username must be at least 3 characters long',
      };
    }

    if (credentials.password.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters long',
      };
    }

    return {
      success: true,
      message: 'Login successful',
      user: {
        id: Date.now().toString(),
        username: credentials.username,
        email: `${credentials.username}@example.com`,
      },
    };
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },
};
