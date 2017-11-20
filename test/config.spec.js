const { expect, use } = require('chai');
const { stub } = require('sinon');
const { enable, disable, registerMock, registerAllowable } = require('mockery');
const asPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const { resolve } = require('path');

use(asPromised);
use(sinonChai);

const requirePath = '../src/config';
const config = require(requirePath);

describe('config', function() {
    it('should be an object', function() {
        expect(config).to.be.an.instanceof(Object);
    });

    describe('defaultOptions', function() {
        it('should be defined', function() {
            expect(config.defaultOptions).to.be.an.instanceof(Function);
        });

        it('should return default options when called with no arguments', function() {
            expect(config.defaultOptions()).to.deep.equal({
                config: resolve(__dirname, '../config.yml'),
                logLevel: 'warn',
                debug: false
            });
        });

        it('should not override argument properties', function() {
            const args = {
                config: '/config.yml',
                logLevel: 'debug',
                debug: true
            };
            expect(config.defaultOptions(args)).to.deep.equal(args);
        });

        it('should merge the default options with the arguments', function() {
            const args = {
                stub: 1,
                config: '/config.yml'
            };
            expect(config.defaultOptions(args)).to.deep.equal({
                config: args.config,
                logLevel: 'warn',
                stub: 1,
                debug: false
            });
        });
    });

    describe('defaultConfig', function() {
        it('should be defined', function() {
            expect(config.defaultConfig).to.be.an.instanceof(Function);
        });

        it('should return a default config when called with no arguments', function() {
            expect(config.defaultConfig()).to.deep.equal({
                port: 8080,
                devices: {}
            });
        });

        it('should not override argument properties', function() {
            const args = {
                port: 8081,
                devices: {
                    test: [{
                        events: ['play'],
                        urls: ['http://google.com']
                    }]
                }
            };
            expect(config.defaultConfig(args)).to.deep.equal(args);
        });

        it('should merge the default config with the arguments', function() {
            const args = {
                stub: 1,
                devices: {
                    test: [{
                        events: ['play'],
                        urls: ['http://google.com']
                    }]
                }
            };
            expect(config.defaultConfig(args)).to.deep.equal({
                port: 8080,
                devices: args.devices,
                stub: 1
            });
        });
    });

    describe('loadConfig', function() {
        let fsMock;
        let utilMock;
        let yamlMock;

        let instance;

        before(function() {
            enable({
                useCleanCache: true
            });
            fsMock = {
                readFile: stub()
            };
            utilMock = {
                promisify: cb => cb
            };
            yamlMock = {
                safeLoad: stub()
            };
            registerMock('fs', fsMock);
            registerMock('util', utilMock);
            registerMock('js-yaml', yamlMock);
            registerAllowable('path');
            registerAllowable(requirePath);

            instance = require(requirePath);

            fsMock.readFile.returns(new Promise(() => {}));
        });

        after(function() {
            disable();
        });

        it('should be defined', function() {
            expect(instance.loadConfig).to.be.an.instanceof(Function);
        });

        it('should return a promise', function() {
            const result = instance.loadConfig('');
            expect(result).to.be.an.instanceof(Promise);
        });

        it('should read the file with utf8 encoding', function() {
            const file = '/config.yml';
            instance.loadConfig(file);
            expect(fsMock.readFile).to.have.been.calledWith(file, 'utf8');
        });

        it('should parse the file as yaml', async function() {
            const file = 'Test';
            fsMock.readFile.resolves(file);
            await instance.loadConfig();
            expect(yamlMock.safeLoad).to.have.been.calledWith(file);
        });

        it('should apply the default options', async function() {
            const config = {
                option: 'value'
            };
            const result = {
                option: 'value',
                port: 8080,
                devices: {}
            };
            fsMock.readFile.resolves();
            yamlMock.safeLoad.returns(config);
            const response = await instance.loadConfig();
            expect(response).to.deep.equal(result);
        });
    });
});
