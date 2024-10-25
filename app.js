const express = require('express');
const app = express();
const dotenv = require('dotenv');
const kvController = require('./controllers/keyValue.controller');
const authController = require('./controllers/auth.controller');

dotenv.config({ path: './process.env' });

app.use(express.json());
app.use(kvController);
app.use(authController);

const port = process.env.PORT || 3000;
// console.log(process.env.PORT);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);
if (process.env.NODE_ENV !== 'test') {  // Start the server only if not in test mode
    app.listen(port, () => console.log(`Server started on port ${port}`));
}

module.exports = app;