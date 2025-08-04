'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function AuthButton() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  
  if (isLoading) {
    return (
      <Button variant="outline" disabled className="opacity-70">
        Loading...
      </Button>
    );
  }
  
  if (session) {
    return (
      <div className="flex items-center gap-4">
        {session.user?.isAdmin && (
          <span className="text-sm px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-md">
            Admin
          </span>
        )}
        <span className="text-sm hidden md:inline">
          {session.user?.name || session.user?.email}
        </span>
        <Button 
          variant="outline" 
          onClick={() => signOut({ callbackUrl: '/' })}
          size="sm"
        >
          Sign out
        </Button>
      </div>
    );
  }
  
  return (
    <Button onClick={() => signIn()}>
      Sign in
    </Button>
  );
}
