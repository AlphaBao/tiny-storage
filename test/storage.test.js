import {expect} from 'chai';
import Storage from 'storage.js';

const storeOne = new Storage('storeOne');
const storeTwo = new Storage('storeTwo');

describe('Storage Tests', () => {

  it('get with an unexist key', () => {
    const key = String(Date.now());
    expect(storeOne.get(key)).to.be.equal(null);
  });

  it('set number', () => {
    storeOne.set('number', 10);
    expect(storeOne.get('number')).to.be.equal(10);
  });

  it('set string', () => {
    storeOne.set('string', 's-test');
    expect(storeOne.get('string')).to.be.equal('s-test');
  });

  it('set object', () => {
    storeOne.set('object', { num: 101 });
    expect(storeOne.get('object').num).to.be.equal(101);
  });

  it('two different stores', () => {
    storeOne.set('money', 20018);
    storeTwo.set('money', 20019);
    expect(storeOne.get('money')).to.be.equal(20018);
    expect(storeTwo.get('money')).to.be.equal(20019);
  });

  it('remove a key', () => {
    storeOne.set('person', 'Bob');
    storeOne.remove('person');
    expect(storeOne.get('person')).to.be.equal(null);
  });

  it('clear store', () => {
    storeOne.set('person', 'Bob');
    storeOne.clear();
    const str = JSON.stringify(storeOne.all());
    expect(str).to.be.equal('{}');
  });

  it('all store', () => {
    storeOne.clear();
    storeOne.set('person', 'Jim');
    storeOne.set('number', 11);
    storeOne.set('string', 'all-test');
    const data = storeOne.all();
    expect(data.person).to.be.equal('Jim');
    expect(data.number).to.be.equal(11);
    expect(data.string).to.be.equal('all-test');
  });

});
