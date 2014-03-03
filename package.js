Package.describe({
  summary: "node-cron for meteor"
});

// meteor test-packages ./
Npm.depends({
    "cron": "1.0.3",
    "time": "0.10.0"
});
Package.on_use(function (api) {
    api.add_files([
        'src/exports.js'
    ], ['server']);

    if (typeof api.export !== 'undefined') {
        api.export('CRON', ['server']);
    }
});

Package.on_test(function (api) {
    api.use(['meteor-cron'], ['server']);
    api.use(['tinytest', 'test-helpers'], ['server', 'client']);
    api.add_files('test/simple.js', ['server', 'client']);
});