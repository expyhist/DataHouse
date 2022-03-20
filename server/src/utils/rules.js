const pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  url: new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i',
  ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
  path: /^(\/\w+)+/,
};

const rules = {
  integer(value) {
    return rules.number(value) && parseInt(value, 10) === value;
  },
  float(value) {
    return rules.number(value) && !rules.integer(value);
  },
  array(value) {
    return Array.isArray(value);
  },
  regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date(value) {
    return (
      typeof value.getTime === 'function'
      && typeof value.getMonth === 'function'
      && typeof value.getYear === 'function'
      && !Number.isNaN(value.getTime())
    );
  },
  number(value) {
    if (Number.isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  object(value) {
    return typeof value === 'object' && !rules.array(value);
  },
  method(value) {
    return typeof value === 'function';
  },
  email(value) {
    return (
      typeof value === 'string'
      && value.length <= 320
      && !!value.match(pattern.email)
    );
  },
  url(value) {
    return (
      typeof value === 'string'
      && value.length <= 2048
      && !!value.match(pattern.url)
    );
  },
  hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  },
  path(value) {
    return typeof value === 'string' && !!value.match(pattern.path);
  },
  json(value) {
    try {
      return typeof value === 'string' && JSON.parse(value);
    } catch (error) {
      return false;
    }
  },
};

module.exports = rules;
