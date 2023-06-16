import {expect} from 'chai';
import {ExpireStorage} from '../../src';

const storeOne = new ExpireStorage('expireStorageOne');
const storeTwo = new ExpireStorage('expireStorageTwo');
const storeThree = new ExpireStorage('expireStorageThree');

storeOne.clear();
storeTwo.clear();
storeThree.clear();

describe('ExpireStorage Tests', () => {

  it('get a non-existent key', () => {
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

  it('keys', () => {
    storeOne.clear();
    storeOne.set('n1', 0);
    storeOne.set('n2', 0);
    storeOne.set('n3', 0);
    const keys = storeOne.keys();
    expect(keys.indexOf('n1') !== -1).to.be.equal(true);
    expect(keys.indexOf('n2') !== -1).to.be.equal(true);
    expect(keys.indexOf('n3') !== -1).to.be.equal(true);
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
    storeOne.set('animals', [ 'fox', 'dog' ]);
    const data = storeOne.all();
    expect(data.person).to.be.equal('Jim');
    expect(data.number).to.be.equal(11);
    expect(data.string).to.be.equal('all-test');
    expect(data.animals[0]).to.be.equal('fox');
    expect(data.animals[1]).to.be.equal('dog');
  });

  it('get an expired key', (done) => {
    storeOne.set('exp', 'val', 1);
    setTimeout(() => {
      expect(storeOne.get('exp')).to.be.equal(null);
      done();
    }, 1500);
  });

  it('get an expired key: 0', () => {
    storeOne.set('exp0', 'val', 0);
    expect(storeOne.get('exp0')).to.be.equal(null);
  });

  it('get a non-expiring key', (done) => {
    storeThree.set('k', 'val', 60 * 60 * 60);
    setTimeout(() => {
      expect(storeThree.get('k')).to.be.equal('val');
      done();
    }, 1000);
  });

});
