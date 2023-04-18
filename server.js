const express = require('express');
const routes = require('./routes');

// import sequelize connection
const sequelize = require('./config/connection')



const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//Using sequilize sync to link the database to the server
//setting force to false to stop it from resetting the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {console.log('Listening on Port %s', PORT)});
});

