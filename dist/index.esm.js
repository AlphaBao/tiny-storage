const i = {
  keys() {
    return Object.keys(localStorage);
  },
  get(s) {
    const e = localStorage.getItem(s);
    return JSON.parse(e);
  },
  set(s, e) {
    localStorage.setItem(s, JSON.stringify(e));
  },
  remove(s) {
    localStorage.removeItem(s);
  },
  clearAll() {
    localStorage.clear();
  }
};
class l {
  constructor(e) {
    this.namespace = e;
  }
  prefix() {
    return `${this.namespace}.`;
  }
  realKey(e) {
    return `${this.prefix()}${e}`;
  }
  get(e) {
    return i.get(this.realKey(e));
  }
  all() {
    return this.keys().reduce((e, t) => (e[t] = this.get(t), e), {});
  }
  keys() {
    const e = this.prefix();
    return i.keys().filter((t) => t.indexOf(e) === 0).map((t) => t.replace(e, ""));
  }
  set(e, t) {
    try {
      i.set(this.realKey(e), t);
    } catch {
      throw new Error(`TinyStorage set error: [${this.realKey(e)}: value]`);
    }
    return !0;
  }
  remove(e) {
    return i.remove(this.realKey(e));
  }
  clear() {
    this.keys().forEach((e) => this.remove(e));
  }
  clearAllStorage() {
    i.clearAll();
  }
}
function a(s) {
  return typeof s == "object" && s !== null;
}
class o extends l {
  constructor(e, t, r) {
    super(e), this.PAYLOAD_KEY = t, this.OPTIONS_KEY = r;
  }
  get(e) {
    const t = super.get(e);
    return a(t) && this.OPTIONS_KEY in t ? t : {
      [this.PAYLOAD_KEY]: t,
      [this.OPTIONS_KEY]: null
    };
  }
  set(e, t, r) {
    return r ? super.set(e, {
      [this.PAYLOAD_KEY]: t,
      [this.OPTIONS_KEY]: r
    }) : super.set(e, t);
  }
}
class u extends o {
  constructor(e, t = ";p", r = ";o") {
    super(e, t, r), this.PAYLOAD_KEY = t, this.OPTIONS_KEY = r;
  }
  now() {
    return Math.floor(Date.now() / 1e3);
  }
  get(e) {
    const t = super.get(e), r = t[this.OPTIONS_KEY] && t[this.OPTIONS_KEY].expire;
    return Number.isInteger(r) ? r > this.now() ? t[this.PAYLOAD_KEY] : (this.remove(e), null) : t[this.PAYLOAD_KEY];
  }
  set(e, t, r) {
    if (Number.isInteger(r)) {
      const n = this.now() + r;
      return super.set(e, t, { expire: n });
    } else
      return super.set(e, t);
  }
  all() {
    return this.keys().reduce((e, t) => (e[t] = this.get(t), e), {});
  }
}
export {
  u as ExpireStorage,
  l as TinyStorage
};
