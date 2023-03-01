const Express = require('express');
const CORS = require('cors');
const Path = require('path');

require('dotenv').config();

const HandleError = require('./middlewares/error/error-handler.middleware');
const UserRoutes = require('./routes/user.routes');
const AdminRoutes = require('./routes/admin.routes');
const ReimbursementRoutes = require('./routes/reimbursement.routes');

const App = Express();

App.use(CORS());
App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));
App.use(Express.static(Path.join(__dirname, 'public')));

App.use('/api/v1/auth', UserRoutes);
App.use('/api/v1/admin', AdminRoutes);
App.use('/api/v1/reimbursement', ReimbursementRoutes);

App.use(HandleError);

const CONN_PORT = process.env.PORT || 3354;
App.listen(
    CONN_PORT,
    () => console.log(`Server Running At http://localhost:${CONN_PORT}`)
);