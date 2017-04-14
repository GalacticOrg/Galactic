# WikiWeb

## Installation


## Configuration

```bash
# Install packages
npm install
# Create DB
- Download the psql app if you haven't already.
- find your psql directory (something like */Applications/Postgres.app/Contents/Versions/9.6/bin/psql). One way to find it is by doubleclicking on a db inside the psql app.
- go up one level to /Applications/Postgres.app/Contents/Versions/9.6/bin/ (note: you'll need to remember this directory later)
- run "createdb wikiweb";
# Initls DB for app
cd into wikiweb-dot-org directory and run "node setup.js"
# Init DB for sessions
Starting with your directory structure (e.g. /Applications/Postgres.app/Contents/Versions/9.6/bin/), run 
"psql wikiweb < node_modules/connect-pg-simple/table.sql". The whole command, run from the wikiweb-dot-org directory, will look something like "/Applications/Postgres.app/Contents/Versions/9.6/bin/psql wikiweb < node_modules/connect-pg-simple/table.sql"

If run correctly, it should print
CREATE TABLE 
ALTER TABLE

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
