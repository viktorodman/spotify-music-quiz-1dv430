## Music Quiz For Spotify

##### [Link To Wiki](https://gitlab.lnu.se/1dv430/student/vo222dq/project/-/wikis/Home)

***

1. [Introduction](#introduction)
2. [Installation](#installation)


## Introduction

"Music Quiz For Spotify" is a music quiz app built with react, redux and express. The application uses the Spotify Web API and the Spotify Web Playback SDK. 


## Installation 

After downloading the repo, you will need to navigate to the root folder of the repo and run: 

```npm install```

We will need to add a .env file in the "server" directory. 

In the .env we will need to add the following variables.

```PORT = '5000'
SESSION_SECRET = <your_session_secret> //replace this
SPOTIFY_CLIENT_ID = <your_spotify_client_id> //replace this
SPOTIFY_CLIENT_SECRET = <your_spotify_client_secret> //replace this
DB_CONNECTION_STRING = <your_mongodb_atlas_connection_string>//replace this
```

###### How to get your Spotify Client Id and Client Secret


Go to [Spotify](https://developer.spotify.com/dashboard/applications) and create a new app.

![create-app](/Instruction_Images/create_app.png)

Fill out the form that appears and press create.

Now we find the Client Id and Client Secret. (*You have to click on the text "SHOW CLIENT SECRET" to find the client secret*)

![client-secret](/Instruction_Images/client_secret.png)

Add the client id and client secret to the .env file that we created earlier.

Now we have add a callback url to the apllication. On the same page that we found the client id, click the "EDIT SETTINGS" button. 



![client-secret](/Instruction_Images/redirect_uri.png)

Here we have to add: ```http://localhost:5000/api/callback``` in the Redirect URIs field and click add.

**IMPORTANT!** Remember to scroll all the way down and press **save!**

###### Adding Connection to a database

Now we need to connect our database to the application. If you dont have already have an [mongodb atlas account](https://account.mongodb.com/account/login), you should create a new free account.

When you are logged in to your mongodb atlas account and you have created a new cluster, you should click the connect button.

![client-secret](/Instruction_Images/connecting.png)

Now you whitelist your current ip-adress and create a new mongoDB user. 

![client-secret](/Instruction_Images/new_user.png)

When that is done you should click the "Choose a connection method" button.
On the next page, you should select the "Connect your application" alternative.


Now we can find our ```DB_CONNECTION_STRING```! click the copy button and paste it in the .env file.

![client-secret](/Instruction_Images/dbstring.png)

Now we have to replace the < username > and < password > with the username and password for the user that we created earlier.

Also replace the < dbname > with "MusicQuiz"

*Example*
```DB_CONNECTION_STRING = mongodb+srv://myUserName:myPassword@cluster0-l8fsw.mongodb.net/MusicQuiz?retryWrites=true&w=majority```

Now the application should work! Navigate to the root folder of the application and run ```npm run start:dev```
The application should now open a new browser window with the application running on ```http://localhost:3000```.