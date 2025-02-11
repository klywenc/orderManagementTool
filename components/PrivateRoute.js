'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children, requiredRole }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    const checkAuthorization = () => {
      if (!session) {
        router.replace('/login');
        return false;
      }

      if (requiredRole && session.user.role !== requiredRole) {
        router.replace('/unauthorized');
        return false;
      }

      return true;
    };

    if (checkAuthorization()) {
      setIsAuthorized(true);
    }
  }, [session, status, requiredRole, router]);

  if (status === 'loading' || !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;