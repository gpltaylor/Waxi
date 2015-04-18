module.exports = function(config){
  config.set({

    basePath : './',

    files : [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/rx/dist/rx.all.min.js',
        'app/app.js',
        'app/Services/*.js',
        'app/**/*.js',
        'app/**/**/*_test.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
			'karma-phantomjs-launcher'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
	
	logLevel: 'INFO',
	colors: true,
	port: 9876,
	singleRun: false,
	captureTimeout: 60000

  });
};
