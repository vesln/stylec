REPORTER ?= dot

check: jshint test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui tdd \
		test/*.test.js

jshint:
	@./node_modules/.bin/jshint .

clean:
	rm -fr lib-cov
	rm -f coverage.html

test-cov: lib-cov
	@STYLEC=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter html-cov \
		test/*.test.js \
		> coverage.html

lib-cov:
	@rm -rf lib-cov
	@./node_modules/jscoverage/bin/jscoverage lib lib-cov

test-coveralls: lib-cov
	@STYLEC=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter mocha-lcov-reporter \
		test/*.test.js \
		| ./node_modules/coveralls/bin/coveralls.js

test-travisci: lib-cov
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@make test
	@make test-coveralls

.PHONY: test-cov test jshint lib-cov
