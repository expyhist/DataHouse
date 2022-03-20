const { format } = require('date-fns');
const log = require('npmlog');
const createServer = require('./server');

const app = createServer();
const port = process.env.PORT || 3000;
app.listen(port, () => log.info(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`, `Server is running on port ${port}`));
