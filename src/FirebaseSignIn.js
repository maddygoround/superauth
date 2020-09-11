import AuthMethod from './AuthMethod';

const signIn = (auth, provider, method = AuthMethod.WITHREDIRECT) => {
  const authMethod = method;

  const exists = Object.keys(AuthMethod).some(k => AuthMethod[k] === authMethod);

  if (exists) {
    return provider.isOAuthProvider
      ? auth[authMethod](provider)
      : auth.signInAnonymously();
  }
  throw new Error('Invalid signIn method.');
};

export default signIn;
