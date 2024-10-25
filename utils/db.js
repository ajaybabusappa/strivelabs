const Sequelize = require('sequelize');

const dotenv = require('dotenv');
dotenv.config({ path: './process.env' });

// const HOST = "localhost";
// const DBNAME =  "keyvaluedb";
// const DBUSER = "root";
// const DBPASS = "Secret@123";
// const PORT = 3306;

const HOST = process.env.DB_HOST;
const DBNAME =  process.env.DB;
const DBUSER = process.env.DB_USER;
const DBPASS = process.env.DB_PASS;
const PORT = 3306;


console.log(HOST);
console.log(DBNAME);
console.log(DBUSER);
console.log(DBPASS);
console.log(PORT);

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
    host: HOST,
    port: PORT,
    logging: true, //Change to false when hosting
    dialect: 'mysql',
    multipleStatements: true,
    pool: {
        max: 5,
        min: 2,
        acquire: 40000,
        idle: 30000,
    }
});

sequelize.authenticate()
    .then(() => { 
        console.log("Connection Established to Database"); 
    })
    .catch(err => { 
        console.log("Connection Failed");
        console.log(err); 
    });

module.exports = {
    sequelize,
    Sequelize
};