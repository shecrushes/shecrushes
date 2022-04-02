## SheCrushes Frontend

Instructions for getting the frontend up and running.

## Getting started

To get started, if you haven't already, clone the project onto your machine with git clone.

1. Go into the `shecrushes` folder and run `npm install`.

2. Once that has completed running, run `npm run dev`.

## Firebase set up

You are able to use shecrushes without an account. Accounts allow you to like and comment on videos. If you want to set up accounts, then you'll have to set up firebase.

1. Follow [this](https://firebase.google.com/docs/web/setup) guide to get a firebase project up and running.

2. Once you have a firebase project created, go to the Sign-in Method tab and enable email/password sign in.

3. After that is done, follow [this](https://support.google.com/firebase/answer/7015592?hl=en#zippy=%2Cin-this-article) guide to get your app config. (scroll to the bottom of the page)

4. Once you have your apps' config, open `firebase.config.js` which is in the same current directory, and copy the firebase configuration fields into the `firebaseConfig` object.

5. Once this complete, restart the app if you were running it in production.
