Package.describe({
  summary: "Support for Remote Debugging"
});

Package.on_use(function (api) {
  //api.use('http', 'server');
  api.use('accounts-base', ['client', 'server']);

  api.add_files('debug_common.js', ['client', 'server']);
  api.add_files('debug_server.js', 'server');
  api.add_files('debug_client.js', 'client');
});

/*
Package.on_test(function (api) {
  api.use('remotedebug', 'server');
  api.use('tinytest');
  api.add_files('debug_tests.js', 'server');
});
*/