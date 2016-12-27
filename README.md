# popularBabiesNames

This is an interactive website showcasing popular baby names from 1880 to 2014 built using Node.js, Angular.js, jQuery, Express, and Vagrant with data represented using SVG based graphics. 

In order to import baby name data, we need to import the NationalNames.csv into mongodb.

To do so:

Download this repository,

open up vagrant using <code>vagrant ssh</code>

find the directory you put this repository in

make sure you have a database in mongodb called 'test'

open mongodb by running <code>mongo</code> in vagrant

make sure you have a database called 'test'

then type <code>use test</code>

then type: <code>db.createCollection("names")</code>

exit mongo by using ctrl>C

then in order to import NationalNames.csv into mongodb type this into vagrant command line:

<code>mongoimport -d test -c names --type csv --file NationalNames.csv --headerline</code>

Now your database should contain everything you need.

_________________BACKEND_________

Backend node functionality, mongodb queries, and routes are stored in server.js

to launch the website type <code>node server.js</code> into vagrant in the 'babynames' directory.

Then type <code>localhost:8080</code> into your browser url.

________________FRONT END_______

All front end materials are stored in the '/public' directory.
