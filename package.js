Package.describe({
  summary: "Support for Remote Debugging"
});

Package.on_use(function (api) {
  api.use([
    'meteor'
  ], ['client', 'server']);

  api.use([
    'templating',
    'handlebars'
  ], 'client');

  api.add_files('cycle.js', 'server');
  api.add_files('debug_common.js', ['client', 'server']);
  api.add_files('debug_server.js', 'server');
  api.add_files('debug_client.js', 'client');
});