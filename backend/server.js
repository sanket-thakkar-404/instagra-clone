require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT
const debug = require('debug')("development:server")
const connectedTODb = require('./src/config/database.config');


connectedTODb();



app.listen(PORT, ()=>{
  debug(`server is running in the port ${PORT}`)
})

