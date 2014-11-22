module.exports = function(grunt) {
  ['grunt-contrib-jshint',
    'grunt-contrib-sass',
    'grunt-contrib-watch'].forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      files: 'public/**/*.js',
      options: { jshintrc: '.jshintrc' }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/style',
          src: ['*.scss'],
          dest: 'public/style',
          ext: '.css'
        }]
      }
    },
    watch: {
      style: {
        files: 'public/style/**/*.scss',
        tasks: ['sass:dist']
      }
    }
  });

  grunt.registerTask('validate', ['jshint']);
  grunt.registerTask('dev', ['sass', 'watch']);
};
