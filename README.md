![](/src/assets/images/logo.svg)

# Let me ask app

Simple real-time Q&A app to be used on livestreams, podcasts and other live events.

App developed during [rocketseat's next level week event](https://rocketseat.com.br/).

![image](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## Features

1. Create a Q&A room
2. Join existing room
3. Ask questions
4. Like other people questions
5. As room admin, highlight question currently beeing answered
6. Delete question
7. Mark question as answered

This app supports dark mode.

## Steps to run locally

In order to run the app locally you have to:

1. Have a project configured in firebase (see how to [create a firebase project here.](https://firebase.google.com/docs/web/setup))

2. Set up google sign-in in authentication (see how to [enable google sign-in in a firebase project here.](https://firebase.google.com/docs/auth/web/google-signin)).

3. Register your app on firebase and save sdk config values (see how to [register your app here](https://firebase.google.com/docs/web/setup#register-app)).

4. Set up a `.env.local` variable with information from the previous step as below:
  
  ```.env
  REACT_APP_API_KEY = ""
  REACT_APP_AUTH_DOMAIN = ""
  REACT_APP_DATABASE_URL = ""
  REACT_APP_PROJECT_ID = ""
  REACT_APP_STORAGE_BUCKET = ""
  REACT_APP_MESSAGING_SENDER_ID = ""
  REACT_APP_APP_ID = ""
  ```

5. Run `npm install` or `yarn install` on the project's root folder.

6. Run `npm start` or `yarn start` to run the app locally.

P.S.: Remember to specify firebase real-time database rules. Basic configuration goes as follows:

```js
{
  "rules": {
    "rooms": {
      ".read": false,
    	".write": "auth != null",
      "$room_id": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.uid)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.uid)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.uid)"
          }
        }
      }
    }
  }
}
```
