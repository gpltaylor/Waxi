module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                configFile: 'karma.conf.js',
				singleRun: true
            }
        },
		phantom: {
			options: {
				port: 4444
			}
		},		
        sass: {
            dist: {
                files: {
                    'app/css/style.css' : 'sass/style.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: 'app/sass/*.scss',
                tasks: ['sass']
            },
			karma: {
				files: ['app/**/**/*.js'],
				tasks: ['karma:unit:run'] //NOTE the :run flag
			  }			
        },
        'http-server': {
            'dev': {
                cache: 0,
                root: './',
                port: 8000,
                host: 'localhost',
                showDir: true,
                runInBackground: true
            },
			'production': {
                cache: 0,
                root: './',
                port: 8080,
                host: 'localhost',
                showDir: true,
                runInBackground: true
			}
        }
    });

    var logger = function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    };

    grunt.event.on('watch', logger);
    grunt.event.on('http-server', logger);
    grunt.event.on('sass', logger);
	grunt.event.on('default', logger);

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-phantom');

    grunt.registerTask('default',['karma']);
    grunt.registerTask('serve',['http-server:dev','sass','watch']);
}