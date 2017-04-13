# WikiWeb

## Installation


## Configuration

```bash
# Install packages
npm install
# Create DB
createdb wikiweb;
# Init DB for app
node setup.js
# Init DB for sessions
psql wikiweb < node_modules/connect-pg-simple/table.sql
```

## Run the application

From the root folder of the project, you can run the application with:
```
npm start
```
You can then access the application on `http://localhost:8080`.

Available pages:
* Log in on `http://localhost:8080`
* Sign up on `http://localhost:8080/signup`
* Dashboard [requires to be logged in] on `http://localhost:8080/dashboard`
* Log out on `http://localhost:8080/logout`
