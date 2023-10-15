import { useCallback, useEffect, useState } from 'react';

interface ConfigApiCalendar {
  apiKey: string;
  clientId: string;
  discoveryDocs: string[];
  scope: string;
  hosted_domain?: string;
}

type TokenClient = {
  callback: (resp) => void;
  error_callback: (resp) => void;
  requestAccessToken: (options: { prompt: string }) => void;
};

const SCRIPT_GAPI_SRC = 'https://apis.google.com/js/api.js';
const SCRIPT_GOOGLE_SRC = 'https://accounts.google.com/gsi/client';

export const useApiCalendar = (config: ConfigApiCalendar) => {
  const [initialized, setInitialized] = useState(false);
  const [tokenClient, setTokenClient] = useState<TokenClient>();
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [googleAuthLoaded, setGoogleAuthLoaded] = useState(false);

  const checkAllScriptsLoaded = useCallback(() => {
    if (gapiLoaded && googleAuthLoaded) {
      setInitialized(true);
    }
  }, [gapiLoaded, googleAuthLoaded]);

  const initGoogleAuth = useCallback(
    (config) => {
      const scriptGoogle = document.createElement('script');
      scriptGoogle.src = SCRIPT_GOOGLE_SRC;
      scriptGoogle.async = true;
      scriptGoogle.defer = true;
      document.body.appendChild(scriptGoogle);

      scriptGoogle.onload = async () => {
        const tokenClient = await window.google.accounts.oauth2.initTokenClient(
          {
            client_id: config.clientId,
            scope: config.scope,
            prompt: '',
            callback: (): void => {},
          }
        );
        setTokenClient(tokenClient);
        setGoogleAuthLoaded(true);
        checkAllScriptsLoaded();
      };
    },
    [checkAllScriptsLoaded]
  );

  const initGapi = useCallback(
    (config) => {
      const scriptGapi = document.createElement('script');
      scriptGapi.src = SCRIPT_GAPI_SRC;
      scriptGapi.async = true;
      scriptGapi.defer = true;
      document.body.appendChild(scriptGapi);

      scriptGapi.onload = () => {
        window.gapi.load('client', () => {
          window.gapi.client
            .init({
              apiKey: config.apiKey,
              discoveryDocs: config.discoveryDocs,
              hosted_domain: config.hosted_domain,
            })
            .then(() => {
              setGapiLoaded(true);
              checkAllScriptsLoaded();
            })
            .catch((e: Error) => {
              console.error(e);
            });
        });
      };
    },
    [checkAllScriptsLoaded]
  );

  useEffect(() => {
    initGapi(config);
    initGoogleAuth(config);
  }, [config, initGapi, initGoogleAuth]);

  // Public methods
  const signIn = async () => {
    if (initialized && tokenClient) {
      return new Promise<void>((resolve, reject) => {
        tokenClient!.callback = (resp) => {
          if (resp.error) {
            reject(resp);
          } else {
            resolve(resp);
          }
        };
        tokenClient!.error_callback = (resp) => {
          reject(resp);
        };
        if (window.gapi.client.getToken() === null) {
          tokenClient!.requestAccessToken({ prompt: 'consent' });
        } else {
          tokenClient!.requestAccessToken({ prompt: '' });
        }
      });
    } else {
      console.error('Error: gapi not loaded');
      return Promise.reject(new Error('Error: gapi not loaded'));
    }
  };

  const signOut = () => {
    if (initialized) {
      const token = window.gapi.client.getToken();
      if (token !== null) {
        window.google.accounts.id.disableAutoSelect();
        window.google.accounts.oauth2.revoke(
          token.access_token,
          (): void => {}
        );
        window.gapi.client.setToken(null);
      }
    } else {
      console.error('Error: gapi not loaded');
    }
  };

  return {
    initialized,
    signIn,
    signOut,
  };
};
