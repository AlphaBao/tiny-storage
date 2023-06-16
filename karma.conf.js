module.exports = function(config) {
  config.set({
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-vite',
      'karma-jasmine'
    ],
    frameworks: ['vite', 'jasmine'],
    files: [
      {
        pattern: 'test/**/*.test.js',
        type: 'module',
        watched: false,
        served: false
      }
    ],
    exclude: [
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity
  });
};
