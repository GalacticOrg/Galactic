
## WikiWeb

A map of the Internet.

# Install

 - Start MongoDb
 - Start Neo4J

Create config file:

```
cp .env.example .env
```

Install:

* Install [MongoDB](https://www.mongodb.com/download-center#community)

* Install [Neo4J](https://neo4j.com/download/)

* Disable Neo4J password [authorization](http://stackoverflow.com/questions/29096616/how-to-disable-basic-auth-on-neo4j-2-2-0-rc01)

Run:

```
$ git clone https://github.com/WikiWebOrg/wikiweb-dot-org.git
$ cd wikiweb-dot-org
$ npm install
```

\* Remember both MongoDB and Neo4J must be running

Create config file:

```
$ cp .env.example .env
```
\* Some configuration are mandatory. Find a sysadmin to give you the .env file.

Then Run:

```
$ npm start
```
# Tests
Run test with:

	$ npm test

#Handy Neo4j Commands

Scrub the Neo4J DB:

``` Neo4j
MATCH (pageOne)-[Link]-(PageTwo)
DELETE pageOne, Link, PageTwo

MATCH (pageUnconnected)
DELETE (pageUnconnected)
```

See all connections:

``` Neo4j
MATCH (pageOne)-[Link]-(PageTwo), (pageUnconnected)
RETURN pageOne, Link, PageTwo, (pageUnconnected)
```

See all unconnected nodes:

``` Neo4j
MATCH (pageUnconnected)
RETURN pageUnconnected
```


See the continuous integration on codeship:
###Master
[ ![Codeship Status for SFDevLabs/galactic](https://codeship.com/projects/e11ce800-0103-0134-bf1e-2e7e86e65593/status?branch=master)](https://codeship.com/projects/153417)
###Development
[ ![Codeship Status for SFDevLabs/galactic](https://codeship.com/projects/e11ce800-0103-0134-bf1e-2e7e86e65593/status?branch=development)](https://codeship.com/projects/153417)
