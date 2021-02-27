import { expect } from 'chai';
import readLayout from '../../lib/read-layout';

describe('readLayout', () => {
    it('is a function', () => {
        expect(typeof readLayout).to.equal('function');
    });
});
