import { expect } from 'chai';
import getRenderedFilepath from '../../lib/get-rendered-filepath';

describe('getRenderedFilepath', () => {
    it('is a function', () => {
        expect(typeof getRenderedFilepath).to.equal('function');
    });
});
