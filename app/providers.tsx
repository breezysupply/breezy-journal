'use client'

import { Amplify } from 'aws-amplify';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';

const defaultConfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
  ssr: true
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    const configureAmplify = async () => {
      try {
        const awsExports = await import('../aws-exports').catch(() => ({}));
        const amplifyConfig = await import('../amplifyconfiguration.json').catch(() => ({}));
        
        Amplify.configure({ 
          ...defaultConfig,
          ...awsExports.default,
          ...amplifyConfig,
          ssr: true 
        });
      } catch (error) {
        console.warn('Failed to import Amplify configuration files. Using default configuration.', error);
        Amplify.configure(defaultConfig);
      } finally {
        setConfigured(true);
      }
    };

    configureAmplify();
  }, []);

  if (!configured) {
    return null; // or a loading spinner
  }

  return <AmplifyProvider>{children}</AmplifyProvider>;
}
