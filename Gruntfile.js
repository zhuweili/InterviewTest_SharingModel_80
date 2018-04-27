module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jsDir: 'public/javascripts',
        cssDir: 'public/stylesheets',
        jsGeneratedDir: 'public/generated/javascripts',
        cssGeneratedDir: 'public/generated/stylesheets',
        ngTemplates: 'public/javascripts/',
        pkg: grunt.file.readJSON('package.json'),

        //Get angular files ready to be minified
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            appLibFiles: {
                files: [
                    {expand: true,
                        cwd: 'node_modules',
                        src: 'angular/angular.js',
                        dest: '<%=jsGeneratedDir%>/libs/annotated',
                        filter: 'isFile'
                    },
                    {expand: true,
                        cwd: 'node_modules',
                        src: 'angular-ui-router/release/angular-ui-router.js',
                        dest: '<%=jsGeneratedDir%>/libs/annotated',
                        filter: 'isFile'
                    },
                    {expand: true,
                        cwd: 'node_modules',
                        src: 'angular-animate/angular-animate.js',
                        dest: '<%=jsGeneratedDir%>/libs/annotated',
                        filter: 'isFile'
                    },
                    {expand: true,
                        cwd: 'node_modules',
                        src: 'angular-aria/angular-aria.js',
                        dest: '<%=jsGeneratedDir%>/libs/annotated',
                        filter: 'isFile'
                    },
                    {expand: true,
                        cwd: 'node_modules',
                        src: 'angular-material/angular-material.js',
                        dest: '<%=jsGeneratedDir%>/libs/annotated',
                        filter: 'isFile'
                    },
                    {expand: true,
                        cwd: 'node_modules',
                        src: 'angular-messages/angular-messages.js',
                        dest: '<%=jsGeneratedDir%>/libs/annotated',
                        filter: 'isFile'
                    }
                ]
            },
            sharingApp: {
                files: [
                    {expand: true,
                        cwd: '<%=jsDir%>',
                        src: 'sharingModelApp.js',
                        dest: '<%=jsGeneratedDir%>/sharingApp/annotated',
                        filter: 'isFile'
                    },
                    {expand: true,
                        cwd: '<%=jsDir%>',
                        src: ['components/**/*.js'],
                        dest: '<%=jsGeneratedDir%>/sharingApp/annotated',
                        filter: 'isFile'
                    },
                    {expand: true,
                        cwd: '<%=jsDir%>',
                        src: ['services/**/*.js', '!**/*Test.js'],
                        dest: '<%=jsGeneratedDir%>/sharingApp/annotated',
                        filter: 'isFile'
                    }
                ]
            },
        },
        //Generate templates cache so that UI shows up fatser
        //Suggested by: http://stackoverflow.com/questions/31535841/angular-material-md-dialog-load-delay
        ngtemplates:  {
            sharingApp: {
                cwd: '<%=jsDir%>',
                src:  '**/*.html',
                dest: '<%=jsGeneratedDir%>/sharingApp/templates/appTemplates.js',
                options: {
                    prefix: '/javascripts/'
                }
            }
        },
        concat: {
            options: {
                banner: '/** DO NOT EDIT - This is a generated file. ' + new Date() + ' **/\n\n',
                separator: '\n'
            },
            jsLibs: {
                src:["node_modules/moment/moment.js",
                    "<%=jsGeneratedDir%>/libs/annotated/angular/angular.js",
                    "<%=jsGeneratedDir%>/libs/annotated/angular-sanitize/angular-sanitize.js",
                    "<%=jsGeneratedDir%>/libs/annotated/angular-ui-router/release/angular-ui-router.js",
                    "<%=jsGeneratedDir%>/libs/annotated/angular-ui-grid/ui-grid.js",
                    "<%=jsGeneratedDir%>/libs/annotated/angular-animate/angular-animate.js",
                    "<%=jsGeneratedDir%>/libs/annotated/angular-aria/angular-aria.js",
                    "<%=jsGeneratedDir%>/libs/annotated/angular-messages/angular-messages.js"
                ],
                dest: "<%=jsGeneratedDir%>/libs/clientlibs.concat.js"
            },
            jsSharingApp: {
                src: [
                    "<%=jsGeneratedDir%>/sharingApp/annotated/sharingModelApp.js",
                    "<%=jsGeneratedDir%>/sharingApp/templates/appTemplates.js",
                    "<%=jsGeneratedDir%>/sharingApp/annotated/components/**/*.js"
                ],
                dest: "<%=jsGeneratedDir%>/sharingApp/sharingApp.concat.js"
            },
            cssSharingApp: {
                src: [
                    "<%=cssDir%>/styles.less",
                    "<%=jsDir%>/components/**/*.less"
                ],
                dest: "<%=cssGeneratedDir%>/sharingApp/sharingApp.concat.less"
            }
        },
        less: {
            production: {
                options: {
                    paths: ['assets/css']
                },
                files: {
                    '<%=cssGeneratedDir%>/sharingApp/sharingApp.concat.css': '<%=cssGeneratedDir%>/sharingApp/sharingApp.concat.less'
                }
            }
        },
        watch: {
            files: ['<%=jsDir%>/**/*.js',
                '<%=jsDir%>/components/**/*.less',
                '<%=ngTemplates%>/**/*.html',
                'Gruntfile.js',
                '!**/*Test.js'
            ],
            tasks: ['ngAnnotate',
                'ngtemplates',
                'concat',
                'less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-angular-templates');

    // Default task(s).
    grunt.registerTask('build', [
        'ngAnnotate',
        'ngtemplates',
        'concat',
        'less',
        'watch'
    ]);
};
