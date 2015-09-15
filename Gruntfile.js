module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			scripts: {
				files: ['css/*.css', 'index.html', 'js/*.js'],
				options: {
					livereload: 9090,
				}
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default');
}