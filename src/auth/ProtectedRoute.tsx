"use client"
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { AuthProviderProps } from '../types/Auth';
import { FunctionComponent } from 'react';
import AuthHeader from '@/components/layouts/AuthHeader';

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">

      <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
        <path clipRule='evenodd'
          d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
          fill='currentColor' fillRule='evenodd' />
      </svg>


      <div>Loading ...</div>
    </div>
  );
};

const ProtectedRouteWrapper: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthResolved, setAuthResolved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('Not authenticated, redirecting to /auth');
      return router.push('/auth');
    }
  }, [isLoading, isAuthenticated, router]);

  if (!isAuthenticated || isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      {children}
    </>
  );
};


function ProtectedRoute(WrappedComponent: FunctionComponent) {
  const ProtectedComponent: FunctionComponent = (props) => {
    return (
      <ProtectedRouteWrapper>
        <AuthHeader>
          <WrappedComponent {...props} />
        </AuthHeader>
      </ProtectedRouteWrapper>
    );
  };

  return ProtectedComponent;
}

export { ProtectedRoute };
