const Express = require('express');
const CORS = require('cors');

require('dotenv').config();

const HandleError = require('./middlewares/error/error-handler.middleware');
const UserRoutes = require('./routes/user.routes');


const App = Express();

App.use(CORS());
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));

App.use('/api/v1/auth', UserRoutes);

App.use(HandleError);

const CONN_PORT = process.env.PORT || 3354;
App.listen(
    CONN_PORT,
    () => console.log(`Server Running At http://localhost:${CONN_PORT}`)
);