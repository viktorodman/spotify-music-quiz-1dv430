### [Link To Wiki](https://gitlab.lnu.se/1dv430/student/vo222dq/project/-/wikis/Home)


"start": "cd server && npm start",
    "devstart": "concurrently \"cd server && npm run devstart\" \"cd client && npm start\" ",
    "heroku-postbuild": "concurrently \"cd client && npm install && npm run build\" \"cd server && npm install\" "