const Hapi = require('hapi');
const Routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: (Number(process.argv[2]) || 4000),
});

server.route(Routes);

if (!module.parent) {
  server.start((err) => {
    if (err) throw (err);
    global.console.log('Server running at:', server.info.uri);
  });
}

module.exports = server;
