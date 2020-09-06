import { useState, useEffect } from 'react';

const getApp = (firebase, config, name) => firebase.apps.find(app => app.name === name)
  || firebase.initializeApp(config, name);

const useFirebase = (firebase, config, name) => {
  const [app, setApp] = useState(() => getApp(firebase, config, name));

  useEffect(() => {
    setApp(() => getApp(firebase, config, name));
  }, [firebase, config, name]);

  return app;
};

export default useFirebase;
