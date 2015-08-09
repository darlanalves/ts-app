build: install
	./node_modules/gulp/bin/gulp.js build

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
	npm install && bower install

clean:
	rm -rf public/ node_modules/