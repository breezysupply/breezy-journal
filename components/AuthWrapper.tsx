'use client'

import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <Authenticator>
      {({ signOut }) => (
        <div>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          {children}
        </div>
      )}
    </Authenticator>
  );
}
