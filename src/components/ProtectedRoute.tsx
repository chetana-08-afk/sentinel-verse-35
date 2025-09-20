import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedPortalTypes?: Array<'tourist' | 'parent' | 'authority'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedPortalTypes 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    if (!isLoading && isAuthenticated && allowedPortalTypes && user) {
      if (!allowedPortalTypes.includes(user.portalType)) {
        // Redirect to appropriate dashboard based on user's portal type
        switch (user.portalType) {
          case 'tourist':
            navigate('/tourist-dashboard', { replace: true });
            break;
          case 'parent':
            navigate('/parent-dashboard', { replace: true });
            break;
          case 'authority':
            navigate('/authority-dashboard', { replace: true });
            break;
        }
      }
    }
  }, [isAuthenticated, isLoading, navigate, allowedPortalTypes, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center cyber-grid bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-orbitron">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
};

export default ProtectedRoute;