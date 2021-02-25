import TinyStorage from 'storage.js';

function isObject(value) {
  return typeof value === 'object' && value !== null;
}

class PayloadStorage extends TinyStorage {
  constructor(namespace, payloadKey, optionsKey) {
    super(namespace);
    this.PAYLOAD_KEY = payloadKey;
    this.OPTIONS_KEY = optionsKey;
  }

  get(key) {
    const data = super.get(key);

    if (isObject(data) && this.OPTIONS_KEY in data) {
      return data;
    } else {
      return {
        [this.PAYLOAD_KEY]: data,
        [this.OPTIONS_KEY]: null
      };
    }
  }

  set(key, value, options) {
    if (options) {
      return super.set(key, {
        [this.PAYLOAD_KEY]: value,
        [this.OPTIONS_KEY]: options
      });
    } else {
      return super.set(key, value);
    }
  }
}

export default PayloadStorage;
