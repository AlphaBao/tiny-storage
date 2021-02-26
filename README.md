# tiny-storage
A tiny localStorage util

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![License][license-image]][npm-url]

[travis-image]: https://img.shields.io/travis/alphabao/tiny-storage?style=flat-square
[npm-image]: https://img.shields.io/npm/v/@alphabao/tiny-storage?style=flat-square
[license-image]: https://img.shields.io/npm/l/@alphabao/tiny-storage?style=flat-square
[travis-url]: https://travis-ci.org/AlphaBao/tiny-storage
[npm-url]: https://www.npmjs.com/package/@alphabao/tiny-storage


## Install

```bash
npm install @alphabao/tiny-storage
```


## Documentation


### Use `localStorage` within namespaces

```javascript
import { TinyStorage } from '@alphabao/tiny-storage';

const store = new Storage('store');
const cart = new Storage('cart');

store.set('book-001', 'Robinson Crusoe');
store.set('book-002', "Grimm's Fairy Tales");
store.set('book-003', 'Martin Eden');

cart.set('book-001', 'The Golden Bough');
cart.set('book-002', 'Moon and Sixpence');
cart.set('book-003', 'Leaves of Grass');

store.get('book-001'); // 'Robinson Crusoe'
store.get('book-002'); // "Grimm's Fairy Tales"
store.get('book-003'); // 'Martin Eden'

cart.get('book-001'); // 'The Golden Bough'
cart.get('book-002'); // 'Moon and Sixpence'
cart.get('book-003'); // 'Leaves of Grass'
```


### get set

```javascript
store.set('apple', 3);
store.set('lemon', 4);

store.get('apple'); // 3
store.get('lemon'); // 4
```


### remove

```javascript
store.set('apple', 3);
store.get('apple'); // 4

store.remove('apple'); // 4
store.get('apple'); // null
```


### clear

```javascript
store.set('apple', 3);
store.set('lemon', 4);

store.clear();
store.get('apple'); // null
store.get('lemon'); // null
```


### all

```javascript
import { TinyStorage } from '@alphabao/tiny-storage';

const myStore = new Storage('store');

myStore.set('apple', 3);
myStore.set('lemon', 4);
myStore.set('animals', [ 'fox', 'dog' ]);

myStore.all();
// {
//   apple: 3,
//   lemon: 4,
//   animals: [ 'fox', 'dog' ]
// }
```
