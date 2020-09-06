import AuthMethod from './AuthMethod';

const signIn = (auth, provider, method = AuthMethod.WITHREDIRECT ) => {

  const authMethod = method;

  var exists = Object.keys(AuthMethod).some(function(k) {
    return AuthMethod[k] === authMethod;
  });

  if (exists) {
    return provider.isOAuthProvider
      ? auth[authMethod](provider)
      : auth.signInAnonymously();
  }
  throw new Error('Invalid signIn method.');
};

export default signIn;
