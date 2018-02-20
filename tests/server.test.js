const routes = require('../src/routes');
const server = require('../src/server');

describe('server', () => {
  test('should contain correct number of routes', () => {
    expect(routes.length)
      .toBe(server.table('localhost')[0].table.length);
  });
});
