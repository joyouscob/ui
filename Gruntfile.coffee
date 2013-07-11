module.exports= (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'

        copy:
            angular:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.angular.source %>'
                    src: ['**/*', '!**/*.json', '!**/*.md']
                    dest: '<%= pkg.build.angular.target %>'
                }, {
                    expand: true
                    cwd: '<%= pkg.build.angularResource.source %>'
                    src: ['**/*', '!**/*.json', '!**/*.md']
                    dest: '<%= pkg.build.angular.target %>'
                }, {
                    expand: true
                    cwd: '<%= pkg.build.angularRoute.source %>'
                    src: ['**/*', '!**/*.json', '!**/*.md']
                    dest: '<%= pkg.build.angular.target %>'
                }, {
                    expand: true
                    cwd: '<%= pkg.build.angularLocale.source %>'
                    src: ['**/*', '!**/*.json', '!**/*.md']
                    dest: '<%= pkg.build.angular.target %>'
                }]
            bootstrap:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.bootstrap.source %>/js'
                    src: ['*.js']
                    dest: '<%= pkg.build.bootstrap.target %>'
                }]
            font:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.font.source %>'
                    src: ['**/*']
                    dest: '<%= pkg.build.font.target %>'
                }]
            jquery:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.jquery.source %>'
                    src: ['*.js']
                    dest: '<%= pkg.build.jquery.target %>'
                }]

        jade:
            awesome:
                options:
                    data:
                        debug: false
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.awesome.partials.source %>'
                    src: ['**/*.jade', '!**/layout.jade']
                    dest: '<%= pkg.build.awesome.partials.target %>'
                    ext: '.html'
                }]

        less:
            awesome:
                files: [{
                    expand: true
                    cwd: '<%= pkg.build.awesome.css.source %>'
                    src: '*.less'
                    dest: '<%= pkg.build.awesome.css.target %>'
                    ext: '.css'
                }]

        watch:
            jade:
                files: ['**/*.jade']
                tasks: ['jade']
            less:
                files: ['**/*.less']
                tasks: ['less']

    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-watch'

    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-jade'
    grunt.loadNpmTasks 'grunt-contrib-less'

    grunt.registerTask 'default', ['copy', 'jade', 'less']
    grunt.registerTask 'dev', ['copy', 'jade', 'less', 'watch']
