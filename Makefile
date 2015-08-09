build:
	./node_modules/gulp/bin/gulp.js build

minify:
	./node_modules/gulp/bin/gulp.js minify

tdd:
	./node_modules/karma/bin/karma start karma.conf.js

test:
	./node_modules/gulp/bin/gulp.js templates;\
	./node_modules/karma/bin/karma start karma.conf.js --single-run

test-coverage:
	rm -rf test/coverage;\
	./node_modules/gulp/bin/gulp.js templates;\
	./node_modules/karma/bin/karma start karma-coverage.conf.js --single-run

install:
	npm install;
	if [ $$? -gt 0 ]; then\
		exit 1;\
	fi;\
	./node_modules/bower/bin/bower install;
	if [ $$? -gt 0 ]; then\
		exit 1;\
	fi;\

clean:
	rm -rf public/ node_modules/

build-ci: clean install test build
