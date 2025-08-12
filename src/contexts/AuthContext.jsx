import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const API_BASE_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  // Set token in localStorage
  const setToken = (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  };

  // API call helper
  const apiCall = async (endpoint, options = {}) => {
    const token = getToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      setToken(data.token);
      setUser(data.user);
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      setToken(data.token);
      setUser(data.user);
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const token = getToken();
      if (token) {
        await apiCall('/auth/logout', {
          method: 'POST',
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setToken(null);
      setUser(null);
      setError(null);
    }
  };

  // Get current user
  const getCurrentUser = async () => {
    try {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const data = await apiCall('/auth/me');
      setUser(data.user);
    } catch (err) {
      console.error('Get current user error:', err);
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status on mount
  useEffect(() => {
    getCurrentUser();
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    getCurrentUser,
    // Profile helpers
    getProfile: async () => {
      const data = await apiCall('/profile');
      setUser(data.user);
      return data.user;
    },
    updateProfile: async (updates) => {
      const data = await apiCall('/profile', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      setUser(data.user);
      return data.user;
    },
    isAuthenticated: !!user,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;