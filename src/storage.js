const local = {
  get(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  },

  all(namespace) {
    const prefix = `${namespace}.`;
    return Object
      .keys(localStorage)
      .reduce((prev, curr) => {
        if (curr.indexOf(prefix) === 0) {
          prev[curr.replace(prefix, '')] = this.get(curr);
        }
        return prev;
      }, {});
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear(namespace) {
    Object
      .keys(localStorage)
      .forEach(key => {
        if (key.indexOf(`${namespace}.`) === 0) {
          localStorage.removeItem(key);
        }
      });
  },

  clearAll() {
    localStorage.clear();
  }
};

class Storage {
  constructor(namespace) {
    this.namespace = namespace;
  }

  realKey(key) {
    return `${this.namespace}.${key}`;
  }

  get(key) {
    return local.get(this.realKey(key));
  }

  all() {
    return local.all(this.namespace);
  }

  set(key, value) {
    try {
      local.set(this.realKey(key), value);
    } catch (e) {
      console.log(`set method error: ${JSON.stringify(e)}`);
      return false;
    }

    return true;
  }

  remove(key) {
    return local.remove(this.realKey(key));
  }

  clear() {
    local.clear(this.namespace);
  }

  clearAllStorage() {
    local.clearAll();
  }
}

export default Storage;
