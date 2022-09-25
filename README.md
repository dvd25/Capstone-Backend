# Fitness Club Management System

## Backend app created for my Capstone Project using Nodejs and Expressjs. Frontend application set up to consume the API's this backend offers.


 A backend application that has API and microservices that a small fitness gym or similar businesses can utilise. 
 
 ### Some feature are:  
    

    - User & Tasks (CRUD operations)                 
    - User authentication            
    - Basic authentication (bcrypt for salt and hash)
    - Ready for frontend to consume it's api services

## How to run

    If you want to run this locally:
    - Clone this backend project to your local.
    - You will need to see up a mysql server whether on the cloud or locally.
    - You can connect to the backend by adding your your mysql details in db.config.js
    - In the project directory, run 
     npm install
     then,
     npm start

    Backend deployed on Elastic Beanstalk EC2:
     As of 26/9/2022 this backend is hosted on http://capstonefitnessbackend-env.eba-izrrrwby.ap-southeast-2.elasticbeanstalk.com/api/users.
     You can connect with any frontend, you can check and try out the different api routes in messages.route.js, tasks.route.js, user.route.js files.

    
    - Clone the front end project to your local here: https://github.com/dvd25/capstone-app-frontend
    - Follow the instructions in the front end repository readme file.

