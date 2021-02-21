import { expect } from 'chai';
import getMetadata from '../../lib/get-metadata';

describe('getMetadata', () => {
    it('is a function', () => {
        expect(typeof getMetadata).to.equal('function');
    });

    it('returns a plain object if passed an invalid filepath', () => {
        expect(getMetadata('')).to.eql({});
    });
});
