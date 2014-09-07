Package.describe({
  name: 'particle4dev:meteor-cron2',
  summary: 'node-cron for meteor',
  version: '1.0.1',
  git: 'https://github.com/particle4dev/meteor-cron.git'
});

// meteor test-packages ./
Npm.depends({
    'cron': '1.0.4',
    'time': '0.11.0'
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@0.9.0');
  api.add_files([
    'src/exports.js',
    'src/wrap.js'
  ], ['server']);

  if (typeof api.export !== 'undefined') {
    api.export('CRON', ['server']);
  }
});

Package.on_test(function (api) {
    api.use(['particle4dev:meteor-cron2'], ['server']);
    api.use([
      'tinytest',
      'test-helpers'
      ], ['server', 'client']);
    api.add_files('test/simple.js', ['server', 'client']);
    api.add_files([
      'test/newCronJob.js',
      'test/onstop.js'
      ], ['server']);
});