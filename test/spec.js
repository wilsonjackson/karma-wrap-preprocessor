'use strict';

var chai = require('chai');
var expect = chai.expect;
var plugin = require('../lib/index');

describe('karma-wrap-preprocessor', function () {
	var preprocessorName;
	var factory;
	var logger;

	beforeEach(function () {
		preprocessorName = 'preprocessor:wrap';
		factory = plugin[preprocessorName][1];
		logger = {
			create: function () {
				return {debug: function () {}};
			}
		};
	});

	it('should export a factory function', function () {
		expect(plugin).to.have.property(preprocessorName);
		expect(plugin[preprocessorName][0]).to.equal('factory');
		expect(plugin[preprocessorName][1]).to.be.a('function');
		expect(plugin[preprocessorName][1].$inject).to.eql(['logger', 'config.basePath', 'config.wrapPreprocessor']);
	});

	it('should wrap a file using an inline template', function (done) {
		var preprocessor = factory(logger, '', {template: 'BEGIN <%= contents %> END'});
		preprocessor('file contents', {}, function (newContents) {
			expect(newContents).to.equal('BEGIN file contents END');
			done();
		});
	});

	it('should wrap a file using an external template', function (done) {
		var preprocessor = factory(logger, __dirname, {file: 'fixture/template.txt'});
		preprocessor('file contents', {}, function (newContents) {
			expect(newContents).to.contain('BEGIN file contents END');
			done();
		});
	});

	it('should allow the contents variable to be changed', function (done) {
		var preprocessor = factory(logger, '', {template: '<%= different %>', variable: 'different'});
		preprocessor('file contents', {}, function (newContents) {
			expect(newContents).to.equal('file contents');
			done();
		});
	});

	it('should allow options to be passed to the lodash template function', function (done) {
		var preprocessor = factory(logger, '', {template: '{{ contents }}', options: {interpolate: /{{([\s\S]+?)}}/g}});
		preprocessor('file contents', {}, function (newContents) {
			expect(newContents).to.equal('file contents');
			done();
		});
	});
});
