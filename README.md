# IBM Code Evaluation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Run

In the project directory, there are two sub-directories. The 'client' directory contains the frontend NodeJS/React application.  The 'api' directory is for the backend application.  Both can be started in there subsiquent directories via the 'npm start' command.

To make things a little easier to get up and running the database is on MongoDB Atlas.  I have configured it so you should have no problems connecting.  If you do then feel free to contact me any way you want. 

There are also Docker files in the application directories as well as a docker-compose.ymal file in the base directory.  They have not been tested for sometime so I can not speak to their working state.  They are mostly there as example files

## API (backend)

The API is JWT authenticated and all the endpoints meet http method aggrements.  

I didn't want to waste time on unnecessary functionality when I knew React would be my bottleneck. 
 - Some POST methods could/should also be PUT methods.
 - There is no self descriptiveness (has links to documentation with example).  That would obviously take a lot of time.
 - Finally, there just isn't enough to the API to show any kind of semantic traversablity through hyper-links.


## Client (frontend)

The only incomplete portion of the client application is the visabily of certain elements when logged in or out.  You can create a user, and you have to authenticate, in order to see, or interact with any of the data.  However the panels that display that data are visable and empty.

I could get it working quite easily by hacking away at it but that doesn't really display any React skill.  I have some ideas on how to get it working via React hooks so I'll continue to work on that a little.


## Seeding data

I have three utilities for this. If you go to the 'http://localhost:3000/reset' page you will see two button; 'wipe persons' and 'load persons'
 - 'wipe persons' removes all person data
 - 'load persons' load the persons from the file './api/resources/input.json'

I have also been using Postman(https://www.postman.com/downloads/) to upload a file to the API at 'http://localhost:5000/api/admin/reset'


## Side Note

I started on some automated testing but didn't get very fare
