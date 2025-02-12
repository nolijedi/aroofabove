import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const session = await checkAuth();
      setIsAuthenticated(!!session);
    };
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
