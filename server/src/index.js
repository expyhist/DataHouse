const { format } = require('date-fns');
const log = require('npmlog');
const createServer = require('./server');

const app = createServer();
const port = process.env.PORT || 3000;
log.info(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`, `Server is running on environment ${process.env.SERVER_ENV}`);
app.listen(port, () => log.info(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`, `Server is running on port ${port}`));
