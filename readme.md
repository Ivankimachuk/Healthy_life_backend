# Healthy Life API

## Description of the project

Healthy Life API - is a full RESTful API that connects to a large database and has multiple routes. It allows users to access a variety of features related to authorization, users, their goals, water, and products.

## Documentation

[Link to front-end](https://va7ul.github.io/Healthy_life/)

[Swagger documentation](https://healthy-life-backend-b6ck.onrender.com/api-docs/#/)

## Technologies

The project is built on the basis of the following technologies:

- **Node.js** for the server part
- **Express.js** for implementation RESTful API
- **MongoDB** for data storage

<p align="left"> 
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> 
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> 
<a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> 
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> 
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> 
<a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> </p>

and other used technologies:

- **Cors**
- **bcrypt**
- **cloudinary**
- **morgan**
- **multer**
- **nodemailer**

## Routes API

The project has several main routes, such as:

- `/auth/signup` - route for user registration
- `/auth/signin` - route for user login with credential validation and authentication token generation
- `/auth/forgot-password` - route for updating information about the user's password, sending a new password to the user's email
- `/auth/signout` - route for user exit from the system (logout)
- `/user/current` - root to get information about the user
- `/user/update` - route to update information about the user or one of the contact information fields with data enumeration
- `/user/goal` - root to update the user target,a new target can be passed in the request body
- `/user/weight` - root adds information about the current weight of the user for the current date
- `/user/food-intake` - route for saving information about the food consumed by the user for the current date or delete data
- `/user/food-intake/:id` - route for updating information about consumed food for a specific record by its identifier (id)
- `/user/water-intake` - route to save information about the user's water consumption for the current date or delete
- `/user/statistics` - root for obtaining statistics of calorie, water and user weight consumption for the selected period
- `/user/recommended-food` - root to get a list of recommended products.


## Teams

### Installation

```bash
npm install

Starting the server

bash

npm run start:dev


```

## The authors

- [@Irulik ](https://github.com/Irulik)
- [@victoria2588 ](https://github.com/victoria2588)
- [@Ivankimachuk ](https://github.com/Ivankimachuk)
- [@Miradzyapko ](https://github.com/Miradzyapko)
