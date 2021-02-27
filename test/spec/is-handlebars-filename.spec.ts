import { expect } from 'chai';
import isHandlebarsFilename from '../../lib/is-handlebars-filename';

describe('isHandlebarsFilename', () => {
    it('is a function', () => {
        expect(typeof isHandlebarsFilename).to.equal('function');
    });
});
