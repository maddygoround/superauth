# superauth
React hooks for firebase authentication


[![npm version](https://badge.fury.io/js/superauth.svg)](https://badge.fury.io/js/superauth)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

## Installation

```bash
$ npm i superauth
```

or

```bash
$ yarn add superauth
```

## Usage

The package expose two custom providers
`<FirebaseAppProvider>` and `<FirebaseAuthProvider>` as shown here.

```jsx
import React from 'react';
import { FirebaseAppProvider , FirebaseAuthProvider } from 'superauth';

import App from './App';
import config from './firebaseConfig';

const MyApp = () => (
  <FirebaseAppProvider config={config}>
    <FirebaseAuthProvider>
      <App />
    </FirebaseAuthProvider>
  </FirebaseAppProvider>
);

export default MyApp;
```

This provides the global context that `useAuth` needs. You can use `useAuth`
anywhere in your App.

Initially, you will probably want to display either a Sign In screen if not signed in.
You can detect if you are signed in like this.

```jsx
import { useAuth } from 'superauth';

const App = () => {

  const { isSignedIn } = useAuth();

useEffect(() => {
    if (isSignedIn) {
      (async () => {
        try {
        /** do your operation **/
        } catch (err) {
          /** throw an exepction **/
        }
      })();
    }
  }, [isSignedIn])


  return (
    <div className="App">
    </div>
  );
};

export default App;
```

```jsx
import { useAuth } from 'superauth';

const App = () => {

  const { isSignedIn } = useAuth();

  return (
    <div className="App">
      {isSignedIn ? <Profile /> : <Login />}
    </div>
  );
};

export default App;
```

We can watch for the change on useEffect or We can either render the `Profile` or the `Login` component.
.

Here's how you can sign in page with user's Google credentials.

```jsx
import { useAuth, AuthProvider } from 'superauth';

const Login = () => {

const { isSignedIn , signIn , createAuthProvider } = useAuth();

useEffect(() => {
    if (isSignedIn) {
      (async () => {
        try {
            /** signedIn successfully **/
        } catch (err) {
            /** signin Error **/
        }
      })();
    }
  }, [isSignedIn])

  const onSignIn = authProvider => {
    const provider = createAuthProvider(authProvider);
    signIn(provider);
  };

  return (
    <div>
      <h1>Please Sign In</h1>
      <p>

        <button className="btn google-button" onClick={() => onSignIn(AuthProvider.GOOGLE)}>
          Sign In with Google
        </button>

        <button className="btn github-button" onClick={() => onSignIn(AuthProvider.GITHUB)}>
          Sign In with GitHub
        </button>

      </p>
    </div>
  );
};
```

Calling onSignIn will redirects you to the authentication page of specficped providers.

After the user is authenticated, you will be redirected back to your app where
`isSignedIn` will be `true`.

You can rather use a popup, instead of a redirect. To do so first import `AuthMethod` 

```js
import { AuthMethod} from "superauth";
```

and then change onSignIn` with this.

```js
const onSignIn = authProvider => {
  const provider = createAuthProvider(authProvider);
  signIn(provider, AuthType.WITHPOPUP );
};
```

You will note that it destructures two things from the call to `useFirebaseAuth`:
`user` (a user object) and `signOut` (a function to sign out).

## API

An import from `superauth` provides
`FirebaseAuthProvider`, `FirebaseAppProvider` , `useAuth`, `AuthMethod` and `AuthProvider`.

### FirebaseAppProvider
Wrap the `FirebaseAuthProvider` inside `FirebaseAppProvider`
```jsx
<FirebaseAppProvider config={config}>
    <FirebaseAuthProvider>
        <App />
    </FirebaseAuthProvider>
</FirebaseAppProvider>
```
`FirebaseAppProvider` accepts firebaseConfig in `config` properties

### FirebaseAuthProvider

You must wrap your `App` in `### FirebaseAuthProvider` and `### FirebaseAuthProvider` like this.

```jsx
<FirebaseAuthProvider>
  <App />
</FirebaseAuthProvider>
```

It provides context for `useAuth`.

### useAuth

`useAuth` is a custom hook that returns a session object every time that the authentication
state changes.

A session object has the following properties.

| Parameter            | Description                                                                  |
| :------------------- | :--------------------------------------------------------------------------- |
| `loading`            | Set to `true` if the rest of the session properties are indeterminate.       |
| `isSignedIn`         | Set to `true` if the user is signed in.                                      |
| `user`               | A `user` object if signed in, otherwise an empty object. See below.                                                    |
| `signInError`        | The error from the previous `signIn` attempt or `null` if it was a success.  |
| `createAuthProvider` | A function that returns a `provider` instance given an enum `AuthProvider` value. |
| `signIn`             | A function that will take the user on the sign in journey. If successful, `isSignedIn` will be to `false`. See below for details.        |
| `signOut`            | A function that will sign the user out. If successful, `isSignedIn` will be to `false`.      |
                                        |

#### signIn

Call `signIn` with an `provider` instance and an optional `options` object.

The `options` object has a single key of `method`. `method` is a string with either
`signInWithRedirect` or `signInWithPopup`. The default is `signInWithRedirect`.

`signIn` returns a promise that will resolve upon a successful sign in (if using a popup)
or reject if a sign in could not be performed.


#### signOut

Call `signOut` to sign the user out.

It returns a promise that will resolve upon a successful sign out
or reject if a sign out could not be performed.

### AuthProvider

`AuthProvider` is an enum with the following values.

| Parameter   | Description                   |
| :---------- | :---------------------------- |
| `ANONYMOUS` | No credentials required.      |
| `GITHUB`    | Authenticate against GitHub   |
| `GOOGLE`    | Authenticate against Google.  |
| `FACEBOOK`  | Authenticate against Facebook |
| `TWITTER`   | Authenticate against Twitter  |

## License

**[APACHE](LICENSE)** Licensed