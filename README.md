# Birdie Developer Test
Project required as part of the birdie recuitment process.

Available on [Heroku](https://birdie-test-0.herokuapp.com/)

## Tech Stack
#### *Frontend
- React
- Redux
- Redux-saga
- Styled Components
- Axios
#### *Backend
- Node.js with Express
- MySQL
- Sequelize
*Jest was used with testing

## Usage
Clone this git repository
#### *Backend
You'll need to create `config/default.json` in the backend root directory and give it the following values:

``` json
{
  "dbConfig": {
    "host": "THE_DATABASE_URL",
    "port": 3306,
    "username": "USER_NAME",
    "password": "PASSWORD",
    "dialect": "mysql",
    "database": "DATABASE_NAME"
  }
}
```
#### *Frontend
You'll need to create a `.env` file in the frontend root directory and give it the following values:
``` bash
REACT_APP_apiEndpoint=http://localhost:8000
REACT_APP_productionEndpoint=https://birdie-test-0.herokuapp.com
```
***These next steps assume you're using a UNIX computer and have got node and mySql***
In your terminal, Navigate to the root directory of the backennd folder (`cd backend`)
##### Run on local machine
- Make sure you have MySql running
- Run `bash run.sh`
- Navigate to [localhost](http://localhost://8000)

##### Deploy to Heroku
***You must have git and the heroku cli installed, have a heroku account, and have created a project.***
- Replace the heroku project name with your own
- Run `bash deploy.sh`
- At the prompt, give your heroku credentials
- NNavigate to the link you'll see on your terminal at the end of the build process.

## Testing
- If you haven't run the `run` script before, navigate to each of the two folders and run `npm install`
- In each of the sub folders, run `npm test`

