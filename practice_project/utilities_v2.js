const _ = function ll(element) {
  ll.range = function (first, second) {
    let range = [];
    const START = second ? first : 0;
    const END = second ? second : first;

    for (let idx = START; idx < END; idx++) {
      range.push(idx);
    }

    return range;
  };

  ll.extend = function (obj, ...extentions) {
    return Object.assign(obj, ...extentions);
  };

  ll.isArray = Array.isArray.bind(this);

  ll.isObject = function(val) {
    if (typeof val === 'object' || typeof val === 'function') {
      return true;
    }

    return false;
  };

  ll.isFunction = function(val) {
    return val.constructor.name === 'Function';
  };

  ll.isBoolean = function(val) {
    return val.constructor.name === 'Boolean';
  };

  ll.isString = function(val) {
    return val.constructor.name === 'String';
  };

  ll.isNumber = function(val) {
    return val.constructor.name === 'Number';
  };

  ll.isElement = function(val) {
    return val instanceof Element;
  }

  const lib = {
    first() {
      return element[0];
    },

    last() {
      return element[element.length - 1];
    },

    without(...values) {
      let modifiedArray = element.slice();

      values.forEach((el) => {
        for (
          let idx = modifiedArray.indexOf(el);
          idx !== -1;
          idx = modifiedArray.indexOf(el)
        ) {
          modifiedArray.splice(idx, 1);
        }
      });

      return modifiedArray;
    },

    lastIndexOf: Array.prototype.lastIndexOf.bind(element),

    sample(amount = 1) {
      let sampler = element.slice();
      let samples = [];

      if (amount === 1) return element[randomIndex()];

      function randomIndex() {
        return Math.floor(Math.random() * Math.ceil(sampler.length));
      }

      for (let idx = 0; idx < amount; idx++) {
        samples.push(sampler[randomIndex()]);
      }

      return samples;
    },

    findWhere(properties) {
      for (let idx = 0; idx < element.length; idx++) {
        let obj = element[idx];
        let validObj = (function () {
          return Object.entries(properties).every(([key, val]) => {
            return Object.keys(obj).includes(key) && obj[key] === val;
          });
        })();
        if (validObj) return obj;
      }
      return undefined;
    },

    where(properties) {
      let matches = [];
      for (let idx = 0; idx < element.length; idx++) {
        let obj = element[idx];
        let validObj = (function () {
          return Object.entries(properties).every(([key, val]) => {
            return Object.keys(obj).includes(key) && obj[key] === val;
          });
        })();
        if (validObj) matches.push(obj);
      }
      return matches;
    },

    pluck(property) {
      return Object.entries(element)
        .filter(([_idx, obj]) => Object.keys(obj).includes(property))
        .flatMap(([_idx, obj]) => obj[property]);
    },

    keys() {
      return Object.getOwnPropertyNames(element);
    },

    values() {
      return this.keys().map(key => element[key]);
    },

    pick(...keys) {
      keys = keys.filter(key => this.keys().includes(key));
      let picked = {};

      keys.forEach(prop => picked[prop] = element[prop]);

      return picked;
    },

    omit(...props) {
      const VALID_PROPS = this.keys().filter(prop => !props.includes(prop));
      return this.pick(...VALID_PROPS);
    },

    has(property) {
      return this.keys().includes(property);
    },

    isArray: Array.isArray.bind(this),

    isObject() {
      if (typeof element === 'object' || typeof element === 'function') {
        return true;
      }

      return false;
    },

    isFunction() {
      return element.constructor.name === 'Function';
    },

    isBoolean() {
      return element.constructor.name === 'Boolean';
    },

    isString() {
      return element.constructor.name === 'String';
    },

    isNumber() {
      return element.constructor.name === 'Number';
    },

    isElement() {
      return element instanceof Element;
    },
  };

  return lib;
};
