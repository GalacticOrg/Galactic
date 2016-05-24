
## Galactic

A map of the Internet.

# Install

 - Start MongoDb
 - Start Neo4J

Create config file:

```
cp .env.example .env
```

Install:

```
$ git clone https://github.com/SFDevLabs/galactic.git
$ cd galactic
$ npm install
```

Run:

```
$ npm start
```
# Tests
Run test with:

	$ npm test

#Handy Neo4j Commands

Scrub the Neo4J DB:

``` Neo4j
MATCH (pageOne)-[Link]-(PageTwo), (pageUnconnected)
DELETE pageOne, Link, PageTwo, pageUnconnected
```

See all connections:

``` Neo4j
MATCH (pageOne)-[Link]-(PageTwo), pageUnconnected
RETURN pageOne, Link, PageTwo, pageUnconnected
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
