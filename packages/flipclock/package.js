Package.describe({
  name: 'flipclock',
  version: '0.0.1',
  summary: 'FlipClock.js for Meteor'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');
  api.use('jquery');
  api.export('FlipClock', 'client');
  api.addFiles(['flipclock.js', 'flipclock.css'], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('modweb:flipclock');
  api.addFiles('flipclock-tests.js');
});
