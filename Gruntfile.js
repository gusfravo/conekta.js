module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jasmine: {
        src: 'dist/conekta.js',
        options: {
            vendor: [
                'node_modules/jquery/dist/jquery.js',
                'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
            ],
            '--web-security' : false,
          specs: 'spec/*.js',
          helpers: 'spec/helpers/*helper.{js,coffee}'
        }
    },
    coffee: {
      compile: {
        files: {
          'dist/conekta_no_dependencies.js': ['src/conekta.js.coffee', 'src/card.js.coffee', 'src/token.js.coffee', 'src/fingerprint.js.coffee']
        }
      }
    },
    concat: {
      conekta_no_dependencies: {
        src: ['src/short_license.js', "dist/conekta_no_dependencies.js", 'src/md5.js'],
        dest: 'dist/conekta_no_dependencies.js'
      },
      conekta_js_debug: {
        src: ["lib/json2.js", "lib/easyXDM.js", "lib/ajax.js", "dist/conekta_no_dependencies.js"],
        dest: 'dist/conekta_debug.js'
      },
      conekta_js: {
        src: ["lib/json2.min.js", "lib/easyXDM.min.js", "lib/ajax.min.js", "dist/conekta_no_dependencies.js"],
        dest: 'dist/conekta.js'
      }
    },
    uglify: {
      no_dependencies: {
        options: {
          preserveComments: 'some',
        },
        files: {
          'dist/conekta_no_dependencies.min.js': ['dist/conekta_no_dependencies.js']
        }
      },
      dependencies: {
        options: {
          preserveComments: 'some',
        },
        files: {
          'dist/conekta.min.js': ['dist/conekta.js']
        }
      },
      json2: {
        options: {
          preserveComments: 'some'
        },
        files: {
          'lib/json2.min.js': ['lib/json2.js']
        }
      },
      ajax: {
        options: {
          preserveComments: 'some'
        },
        files: {
          'lib/ajax.min.js': ['lib/ajax.js']
        }
      }
    },
    watch: {
      src: {
        files: 'src/*.js.coffee',
        tasks: ['default'],
        options: {
          events: ['all']
        }
      }
    }
  });
  
  grunt.registerTask('default', ['coffee', 'concat', 'uglify']);

};