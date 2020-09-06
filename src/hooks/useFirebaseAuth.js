import {
  useState, useEffect, useMemo, useCallback,
} from 'react';

import _createAuthProvider from '../CreateAuthProvider';
import _signIn from '../FirebaseSignIn';
import _signOut from '../FirebaseSignOut';

const defaultSession = { loading: true };

const useFirebaseAuth = (app) => {
  const [session, setSession] = useState(defaultSession);
  const [signInError, setSignInError] = useState(null);

  const onSignInError = useCallback((error) => { setSignInError(error); }, [setSignInError]);
  const auth = useMemo(() => app.auth(), [app]);

  const signIn = useCallback(
    (...args) => {
      setSignInError(null);
      return _signIn(auth, ...args).catch(onSignInError);
    }, [auth, setSignInError, onSignInError]
  );

  const signOut = useCallback((...args) => _signOut(auth, ...args), [auth]);
  const createAuthProvider = useCallback((...args) => _createAuthProvider(app, ...args), [app]);

  useEffect(
    () => auth.onAuthStateChanged((user) => {
      const isSignedIn = user;
      setSession({ isSignedIn, user });
    }),
    [auth, setSession]
  );

  useEffect(
    () => {
      auth.getRedirectResult().catch(onSignInError);
    },
    [auth, onSignInError]
  );

  const results = useMemo(() => ({
    ...session,
    signInError,
    app,
    signIn,
    signOut,
    createAuthProvider,
  }), [session, signInError, app, signIn, signOut, createAuthProvider]);

  return results;
};

export default useFirebaseAuth;
