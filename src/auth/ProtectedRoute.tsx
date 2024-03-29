"use client"

import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { AuthProviderProps } from '../types/Auth';

export const ProtectedRoute: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, user, router]);

  return (
    <>
      {children}
    </>
  );
};