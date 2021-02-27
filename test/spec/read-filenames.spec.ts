import { expect } from 'chai';
import readFilenames from '../../lib/read-filenames';

describe('readFilenames', () => {
    it('is a function', () => {
        expect(typeof readFilenames).to.equal('function');
    });
});
