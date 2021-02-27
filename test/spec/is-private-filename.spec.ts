import { expect } from 'chai';
import isPrivateFilename from '../../lib/is-private-filename';

describe('isPrivateFilename', () => {
    it('is a function', () => {
        expect(typeof isPrivateFilename).to.equal('function');
    });
});
