import React, {
  createContext, useMemo, useContext, useDebugValue,
} from 'react';
import PropTypes from 'prop-types';
import firebase_ from 'firebase/app';
import useFirebase from '../hooks/useFirebase';

const FirebaseAppContext = createContext({ app: null, signature: null });
const providerSignature = Symbol();

const FirebaseAppProvider = ({
  name, firebase, config, children,
}) => {
  const app = useFirebase(firebase, config, name);
  const payload = useMemo(() => ({ signature: providerSignature, app }), [app]);

  return (
    <FirebaseAppContext.Provider value={payload}>
      {children}
    </FirebaseAppContext.Provider>
  );
};

const useFirebaseApp = () => {
  const { signature, app } = useContext(FirebaseAppContext) || {};

  if (signature !== providerSignature) {
    throw new Error(
      'useApp must be a descendant of <FirebaseAppProvider/>'
    );
  }
  useDebugValue(app.name);
  return app;
};

FirebaseAppProvider.propTypes = {

  firebase: PropTypes.shape({
    apps: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })),
    initializeApp: PropTypes.func,
  }),

  config: PropTypes.shape({
    apiKey: PropTypes.string.isRequired,
    authDomain: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
  }).isRequired,

  name: PropTypes.string,
  children: PropTypes.element.isRequired,

};

FirebaseAppProvider.defaultProps = {
  firebase: firebase_,
  name: '[DEFAULT]',
};

export {
  FirebaseAppProvider,
  useFirebaseApp,
};
