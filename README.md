# RecipeBox - A Food Forum and Recipe Sharing Platform

## Description

RecipeBox is a user-friendly platform designed to bridge the gap between food enthusiasts and professional chefs. Whether you're looking to try a new dish, or want to share your signature recipe with the world, RecipeBox is the place to be. Users can sign up, log in, share their recipes, like the recipes, and even comment and review the recipes shared by others. Additionally, users can view their favorite recipes on their profile alongside their own contributions.

## Deployment Link

<a href="https://powerful-sierra-12005-787af3607f3d.herokuapp.com/"> RecipeBox Deployment Link</a>

## Features
- **User Authentication**: Secure signup and login system.
- **Recipe Sharing**: Add and share your food recipes with the community.
- **Forum**: Browse through a rich collection of user-added recipes.
- **Review & Comment**: View a user-added recipe and review the food by commenting.
- **User Profile**: View your added recipes and the ones you've liked.

## Screenshots

![image](https://github.com/J-D-garwood/recipe-forum/assets/133511202/593a4a7f-aa54-42b0-b859-61b47fbd8e93)
![image](https://github.com/J-D-garwood/recipe-forum/assets/133511202/b67e2a72-d05a-4700-97d9-2f6b375e87e6)
![image](https://github.com/J-D-garwood/recipe-forum/assets/133511202/6ab7bd08-25c6-4b07-af31-28a62bb4066a)
![image](https://github.com/J-D-garwood/recipe-forum/assets/133511202/37a496ea-1cbd-4b53-9e8e-a51a423a69e2)
![image](https://github.com/J-D-garwood/recipe-forum/assets/133511202/4759ac4d-7b9d-4f6f-8ebb-400cabe874f2)

## Technologies Used
- `Handlebars.js`: A minimal templating engine used to render the views for our application.
- `Bootstrap CSS Framework`: Utilized for styling and responsive design.
### Main Dependencies
- `bcrypt`: For securing user passwords.
- `connect-session-sequelize`: Enables the use of sessions with Sequelize.
- `dotenv`: Environment variable loader.
- `express`: Backend server framework.
- `express-handlebars`: A template engine for Express.
- `express-session`: Session middleware for Express.
- `mysql2`: MySQL client for Node.js. Enables the use of MySQL databases.
- `sequelize`: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- `multer`: Middleware for handling `multipart/form-data`. Primarily used for uploading files.
- `uuid`: For the creation of RFC4122 UUIDs.

### Dev Dependencies
- `eslint`: A linting tool to maintain code quality.
- `eslint-config-prettier`: Disables ESLint rules that might conflict with Prettier.
- `prettier`: An opinionated code formatter.

## Getting Started

### Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install all the required dependencies.
4. Create a `.env` file at the root of your project and set up your environment variables (e.g., database credentials).
5. Login to Mysql
6. Source the schema.sql file ```source db/schema.sql```
7. Quit out of Mysql using ```quit```
8. Run the see using ```npm run seed```
9. Run the server using ```npm start```.


## Future Enhancements
- Ability to categorize recipes based on cuisine type.
- An advanced search functionality for easier recipe discovery.
- Ability for the user to be able to edit their recipes if need for correction or update​
- Give the user the ability to create a shopping list, and options from where the ingredients can be found​
- Ability to add more than one image for a recipe​
- Implementing a rating system where users can rate recipes on a scale of 1 to 5​
- Allow users to upload short video clips or tutorials alongside the recipe.

## Credit

### Team Members
-  <a href="https://github.com/andrei-ribeiro-wenceslau">Andrei Ribeiro Wenceslau</a> 
- <a href="https://github.com/J-D-garwood">James Garwood</a>
- <a href="https://github.com/shimna-puthanayil">Shimna Puthanayil</a>
- <a href="https://github.com/rishavpandey02">Rishav Pandey</a>

### References
- https://www.bezkoder.com/node-js-upload-image-mysql/
- https://stackoverflow.com/questions/5570390/resize-event-for-textarea
- https://dev.to/stackfindover/35-html-404-page-templates-5bge
- https://css-tricks.com/auto-growing-inputs-textareas/
- https://sequelize.org/docs/v7/models/data-types/



---

We hope you enjoy using RecipeBox and discover many delicious recipes. Happy cooking! 🍳🥘🍰
