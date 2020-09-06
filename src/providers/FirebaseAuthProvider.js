import React, { createContext, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFirebaseApp as _useFirebaseApp } from './FirebaseAppProvider';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const FirebaseAuthContext = createContext({ auth: null });
const providerSignature = Symbol();

const FirebaseAuthProvider = ({ children, useFirebaseApp }) => {
  const firebaseApp = useFirebaseApp();
  const session = useFirebaseAuth(firebaseApp);

  const payload = useMemo(() => ({ signature: providerSignature, session }), [
    session,
  ]);

  return (
    <FirebaseAuthContext.Provider value={payload}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useAuth = () => {
  const { signature, session } = useContext(FirebaseAuthContext) || {};

  if (signature !== providerSignature) {
    throw new Error(
      'useAuth must be a descendant of <FirebaseAuthProvider/>'
    );
  }
  return session;
};

FirebaseAuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
  useFirebaseApp: PropTypes.func,
};
FirebaseAuthProvider.defaultProps = {
  useFirebaseApp: _useFirebaseApp,
};

export {
  FirebaseAuthProvider,
  useAuth,
};
