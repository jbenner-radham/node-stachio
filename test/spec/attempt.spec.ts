import { expect } from 'chai';
import attempt from '../../lib/attempt';

describe('attempt', () => {
    it('is a function', () => {
        expect(typeof attempt).to.equal('function');
    });

    it('returns the same value as the callback passed to it', () => {
        const value = 'test';

        expect(attempt(() => value)).to.equal(value);
    });

    it('returns `undefined` when not passed a callback', () => {
        expect(attempt(undefined as Function)).to.equal(undefined);
    });

    it('will not throw an exception', () => {
        expect(attempt(() => { throw Error() })).to.equal(undefined);
    });
});
