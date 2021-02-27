import { expect } from 'chai';
import readConfigFile, { CONFIG_RELATIVE_FILEPATH } from '../../lib/read-config-file';

describe('CONFIG_RELATIVE_FILEPATH', () => {
    it('is a string', () => {
        expect(typeof CONFIG_RELATIVE_FILEPATH).to.equal('string');
    });
});

describe('readConfigFile', () => {
    it('is a function', () => {
        expect(typeof readConfigFile).to.equal('function');
    });
});
