'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthProviderProps, IAuthContext } from '../types/Auth';

export const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/api/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      }).then(response => {
        setUser(response.data);
        setIsLoading(false);
      }).catch(error => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
