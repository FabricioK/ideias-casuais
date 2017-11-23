// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCSrm1IO5UShks7Y2w1ZLfPtrY0n6fp52E",
    authDomain: "ideias-casuais.firebaseapp.com",
    databaseURL: "https://ideias-casuais.firebaseio.com",
    projectId: "ideias-casuais",
    storageBucket: "ideias-casuais.appspot.com",
    messagingSenderId: "93520681934"
  }
};
