import PayloadStorage from 'wrapper/payload.js';

class ExpireStorage extends PayloadStorage {
  constructor(namespace, payloadKey = ';p', optionsKey = ';o') {
    super(namespace, payloadKey, optionsKey);
    this.PAYLOAD_KEY = payloadKey;
    this.OPTIONS_KEY = optionsKey;
  }

  get(key) {
    const data = super.get(key);
    const expire = data[this.OPTIONS_KEY] && data[this.OPTIONS_KEY].expire;

    if (Number.isInteger(expire)) {
      if (expire > Math.floor(Date.now() / 1000)) {
        return data[this.PAYLOAD_KEY];
      } else {
        this.remove(key);
        return null;
      }
    } else {
      return data[this.PAYLOAD_KEY];
    }
  }

  set(key, value, seconds) {
    if (Number.isInteger(seconds)) {
      const expire = Math.floor(Date.now() / 1000) + seconds;
      return super.set(key, value, { expire });
    } else {
      return super.set(key, value);
    }
  }

  all() {
    return this.keys()
      .reduce((prev, curr) => {
        prev[curr] = this.get(curr);
        return prev;
      }, {});
  }
}

export default ExpireStorage;
