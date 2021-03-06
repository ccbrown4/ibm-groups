# IBM Code Evaluation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

In the project directory, there are two sub-directories. The `client` directory contains the frontend NodeJS/React application.  The `api` directory is for the backend application.  Both can be started in their respective directories via the `npm start` command.

To make things a little easier to get up and running, the database is on MongoDB Atlas.  I have configured it so you should have no problems connecting.  If you do, feel free to contact me. 

There are also Docker files in the application directories as well as a docker-compose.yml file in the base directory.

## API (backend)

The API is JWT authenticated and all the endpoints meet http method agreements.  

I could have made the API more RESTful but it didn't need it.  This allowed for more time to work on the React portion of the assignment.  Some conciderations are:
 - Some POST methods could/should also be PUT methods.
 - There is no self descriptiveness (no links to documentation with examples).
 - Finally, there just isn't enough to the API to show any kind of semantic traversablity through hyperlinks.


## Client (frontend)

Here is a pre-existing auth:
 - user: john@doe.com
 - pass: 123456
The only incomplete portion of the client application is the visibility of blank pages when not logged in.  For instance, if you are not logged in you can see the page for persons, groups and colors however the API will not return data to be rendered because you are not logged in.  You can create a user, and you have to authenticate in order to see or interact with any of the data.

I could get it working quite easily by hacking away at it but that doesn't really display any React skill.  I have some ideas on how to get it working via React hooks so I'll continue to work on that a little.  There is a branch for this repo called `auth/fix`.  I will keep the auth ui changes there.


## Seeding data

I have three utilities for this. If you go to the 'http://localhost:3000/reset' page you will see two buttons: `wipe persons` and `load persons`.
 - `wipe persons` removes all person data
 - `load persons` load the persons from the file `./api/resources/input.json`

I have also been using Postman (https://www.postman.com/downloads/) to upload a file to the API at `http://localhost:6000/api/admin/reset`.


## Side note

I started on some automated testing but didn't get very far.
