import { expect } from 'chai';
import isLayoutFilename from '../../lib/is-layout-filename';

describe('isLayoutFilename', () => {
    it('is a function', () => {
        expect(typeof isLayoutFilename).to.equal('function');
    });
});
