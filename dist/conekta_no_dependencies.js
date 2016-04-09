/* 
 * conekta.js v1.0.0
 * Conekta 2013
 * https://github.com/conekta/conekta.js/blob/master/LICENSE.txt
 */

(function() {
  var $tag, Base64, _language, antifraud_config, base_url, fingerprint, getAntifraudConfig, getCartCallback, i, j, k, kount_merchant_id, localstorageGet, localstorageSet, originalGetCart, originalOnCartUpdated, originalOnItemAdded, public_key, random_index, random_value_array, ref, send_beacon, session_id, useable_characters;

  base_url = 'https://api.conekta.io/';

  session_id = "";

  _language = 'es';

  kount_merchant_id = '205000';

  antifraud_config = {};

  if (!window.conektaAjax) {
    if (typeof jQuery !== 'undefined') {
      window.conektaAjax = jQuery.ajax;
    } else {
      console.error("no either a jQuery or ajax function provided");
    }
  }

  localstorageGet = function(key) {
    var error;
    if (typeof localStorage !== 'undefined' && typeof localStorage.getItem !== 'undefined') {
      try {
        localStorage.setItem('testKey', '1');
        localStorage.removeItem('testKey');
        return localStorage.getItem(key);
      } catch (_error) {
        error = _error;
        return null;
      }
    } else {
      return null;
    }
  };

  localstorageSet = function(key, value) {
    var error;
    if (typeof localStorage !== 'undefined' && typeof localStorage.setItem !== 'undefined') {
      try {
        localStorage.setItem('testKey', '1');
        localStorage.removeItem('testKey');
        return localStorage.setItem(key, value);
      } catch (_error) {
        error = _error;
        return null;
      }
    } else {
      return null;
    }
  };

  public_key = localstorageGet('_conekta_publishable_key');

  fingerprint = function() {
    var body, e, iframe, image;
    if (typeof document !== 'undefined' && typeof document.body !== 'undefined' && document.body && (document.readyState === 'interactive' || document.readyState === 'complete') && 'undefined' !== typeof Conekta) {
      if (!Conekta._helpers.finger_printed) {
        Conekta._helpers.finger_printed = true;
        body = document.getElementsByTagName('body')[0];
        iframe = document.createElement('iframe');
        iframe.setAttribute("height", "1");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("width", "1");
        iframe.setAttribute("src", base_url + "fraud_providers/kount/logo.htm?m=" + kount_merchant_id + "&s=" + session_id);
        image = document.createElement('img');
        image.setAttribute("height", "1");
        image.setAttribute("width", "1");
        image.setAttribute("src", base_url + "fraud_providers/kount/logo.gif?m=" + kount_merchant_id + "&s=" + session_id);
        try {
          iframe.appendChild(image);
        } catch (_error) {
          e = _error;
        }
        body.appendChild(iframe);
      }
    } else {
      setTimeout(fingerprint, 150);
    }
  };

  send_beacon = function() {
    var _user_id, ls;
    if (typeof document !== 'undefined' && typeof document.body !== 'undefined' && document.body && (document.readyState === 'interactive' || document.readyState === 'complete') && 'undefined' !== typeof Conekta) {
      if (!Conekta._helpers.beacon_sent) {
        if (antifraud_config['riskified']) {
          ls = function() {
            var s, store_domain, url, x;
            store_domain = antifraud_config['riskified']['domain'];
            session_id = session_id;
            url = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'beacon.riskified.com?shop=' + store_domain + '&sid=' + session_id;
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = url;
            x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
          };
          ls();
        }
        if (antifraud_config['siftscience']) {
          _user_id = session_id;
          window._sift = window._sift || [];
          _sift.push(["_setAccount", antifraud_config['siftscience']['beacon_key']]);
          _sift.push(["_setSessionId", session_id]);
          _sift.push(["_trackPageview"]);
          ls = function() {
            var e, s;
            e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'cdn.siftscience.com/s.js';
            s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(e, s);
          };
          ls();
        }
      }
    } else {
      setTimeout(send_beacon, 150);
    }
  };

  if (localstorageGet('_conekta_session_id') && localstorageGet('_conekta_session_id_timestamp') && ((new Date).getTime() - 600000) < parseInt(localstorageGet('_conekta_session_id_timestamp'))) {
    session_id = localStorage.getItem('_conekta_session_id');
    fingerprint();
  } else if (typeof Shopify !== 'undefined') {
    if (typeof Shopify.getCart === 'undefined' && typeof jQuery !== 'undefined') {
      Shopify.getCart = function(callback) {
        return jQuery.getJSON("/cart.js", function(cart) {
          if ("function" === typeof callback) {
            return callback(cart);
          }
        });
      };
    }
    getCartCallback = function(cart) {
      session_id = cart['token'];
      if (session_id !== null && session_id !== '') {
        fingerprint();
        send_beacon();
        localstorageSet('_conekta_session_id', session_id);
        localstorageSet('_conekta_session_id_timestamp', (new Date).getTime().toString());
      }
    };
    if (typeof Shopify.getCart !== 'undefined') {
      Shopify.getCart(function(cart) {
        getCartCallback(cart);
      });
    }
    originalGetCart = Shopify.getCart;
    Shopify.getCart = function(callback) {
      var tapped_callback;
      tapped_callback = function(cart) {
        getCartCallback(cart);
        callback(cart);
      };
      originalGetCart(tapped_callback);
    };
    originalOnItemAdded = Shopify.onItemAdded;
    Shopify.onItemAdded = function(callback) {
      var tapped_callback;
      tapped_callback = function(item) {
        Shopify.getCart(function(cart) {
          getCartCallback(cart);
        });
        callback(item);
      };
      originalOnItemAdded(tapped_callback);
    };
    originalOnCartUpdated = Shopify.onCartUpdated;
    Shopify.onCartUpdated = function(callback) {
      var tapped_callback;
      tapped_callback = function(cart) {
        getCartCallback(cart);
        callback(cart);
      };
      originalOnCartUpdated(tapped_callback);
    };
    if (typeof jQuery !== 'undefined') {
      jQuery(document).ajaxSuccess(function(event, request, options, data) {
        if (options['url'] === 'cart/add.js') {
          Shopify.getCart(function(cart) {
            getCartCallback(cart);
          });
        }
      });
    }
  } else {
    useable_characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues !== 'undefined') {
      random_value_array = new Uint32Array(32);
      crypto.getRandomValues(random_value_array);
      for (i = j = 0, ref = random_value_array.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        session_id += useable_characters.charAt(random_value_array[i] % 36);
      }
    } else {
      for (i = k = 0; k <= 30; i = ++k) {
        random_index = Math.floor(Math.random() * 36);
        session_id += useable_characters.charAt(random_index);
      }
    }
    localstorageSet('_conekta_session_id', session_id);
    localstorageSet('_conekta_session_id_timestamp', (new Date).getTime().toString());
    fingerprint();
  }

  getAntifraudConfig = function() {
    var error_callback, success_callback, unparsed_antifraud_config, url;
    unparsed_antifraud_config = localstorageGet('conekta_antifraud_config');
    if (unparsed_antifraud_config && unparsed_antifraud_config.match(/^\{/)) {
      return antifraud_config = JSON.parse(unparsed_antifraud_config);
    } else {
      success_callback = function(config) {
        antifraud_config = config;
        localstorageSet('conekta_antifraud_config', antifraud_config);
        return send_beacon();
      };
      error_callback = function() {};
      url = "https://d3fxnri0mz3rya.cloudfront.net/antifraud/" + public_key + ".js";
      return conektaAjax({
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'conekta_antifraud_config_jsonp',
        success: success_callback,
        error: error_callback
      });
    }
  };

  getAntifraudConfig();

  Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output;
      output = "";
      chr1 = void 0;
      chr2 = void 0;
      chr3 = void 0;
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = void 0;
      i = 0;
      input = Base64._utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else {
          if (isNaN(chr3)) {
            enc4 = 64;
          }
        }
        output = output + Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) + Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
      }
      return output;
    },
    decode: function(input) {
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4, output;
      output = "";
      chr1 = void 0;
      chr2 = void 0;
      chr3 = void 0;
      enc1 = void 0;
      enc2 = void 0;
      enc3 = void 0;
      enc4 = void 0;
      i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
        enc4 = Base64._keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = Base64._utf8_decode(output);
      return output;
    },
    _utf8_encode: function(string) {
      var c, n, utftext;
      string = string.replace(/\r\n/g, "\n");
      utftext = "";
      n = 0;
      while (n < string.length) {
        c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        n++;
      }
      return utftext;
    },
    _utf8_decode: function(utftext) {
      var c, c1, c2, c3, string;
      string = "";
      i = 0;
      c = c1 = c2 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
  };

  if (!window.Conekta) {
    window.Conekta = {
      setLanguage: function(language) {
        return _language = language;
      },
      getLanguage: function() {
        return _language;
      },
      setPublicKey: function(key) {
        if (typeof key === 'string' && key.match(/^[a-zA-Z0-9_]*$/) && key.length >= 20 && key.length < 30) {
          public_key = key;
          localstorageSet('_conekta_publishable_key', public_key);
        } else {
          Conekta._helpers.log('Unusable public key: ' + key);
        }
      },
      getPublicKey: function(key) {
        return public_key;
      },
      _helpers: {
        finger_printed: false,
        beacon_sent: false,
        objectKeys: function(obj) {
          var keys, p;
          keys = [];
          for (p in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
              keys.push(p);
            }
          }
          return keys;
        },
        parseForm: function(form_object) {
          var all_inputs, attribute, attribute_name, attributes, input, inputs, json_object, l, last_attribute, len, len1, m, node, o, parent_node, q, r, ref1, ref2, ref3, selects, textareas, val;
          json_object = {};
          if (typeof form_object === 'object') {
            if (typeof jQuery !== 'undefined' && (form_object instanceof jQuery || 'jquery' in Object(form_object))) {
              form_object = form_object.get()[0];
              if (typeof form_object !== 'object') {
                return {};
              }
            }
            if (form_object.nodeType) {
              textareas = form_object.getElementsByTagName('textarea');
              inputs = form_object.getElementsByTagName('input');
              selects = form_object.getElementsByTagName('select');
              all_inputs = new Array(textareas.length + inputs.length + selects.length);
              for (i = l = 0, ref1 = textareas.length - 1; l <= ref1; i = l += 1) {
                all_inputs[i] = textareas[i];
              }
              for (i = m = 0, ref2 = inputs.length - 1; m <= ref2; i = m += 1) {
                all_inputs[i + textareas.length] = inputs[i];
              }
              for (i = o = 0, ref3 = selects.length - 1; o <= ref3; i = o += 1) {
                all_inputs[i + textareas.length + inputs.length] = selects[i];
              }
              for (q = 0, len = all_inputs.length; q < len; q++) {
                input = all_inputs[q];
                if (input) {
                  attribute_name = input.getAttribute('data-conekta');
                  if (attribute_name) {
                    if (input.tagName === 'SELECT') {
                      val = input.value;
                    } else {
                      val = input.getAttribute('value') || input.innerHTML || input.value;
                    }
                    attributes = attribute_name.replace(/\]/g, '').replace(/\-/g, '_').split(/\[/);
                    parent_node = null;
                    node = json_object;
                    last_attribute = null;
                    for (r = 0, len1 = attributes.length; r < len1; r++) {
                      attribute = attributes[r];
                      if (!node[attribute]) {
                        node[attribute] = {};
                      }
                      parent_node = node;
                      last_attribute = attribute;
                      node = node[attribute];
                    }
                    parent_node[last_attribute] = val;
                  }
                }
              }
            } else {
              json_object = form_object;
            }
          }
          return json_object;
        },
        getSessionId: function() {
          return session_id;
        },
        xDomainPost: function(params) {
          var error_callback, rpc, success_callback;
          success_callback = function(data, textStatus, jqXHR) {
            if (!data || (data.object === 'error') || !data.id) {
              return params.error(data || {
                object: 'error',
                type: 'api_error',
                message: "Something went wrong on Conekta's end",
                message_to_purchaser: "Your code could not be processed, please try again later"
              });
            } else {
              return params.success(data);
            }
          };
          error_callback = function() {
            return params.error({
              object: 'error',
              type: 'api_error',
              message: 'Something went wrong, possibly a connectivity issue',
              message_to_purchaser: "Your code could not be processed, please try again later"
            });
          };
          if (document.location.protocol === 'file:' && navigator.userAgent.indexOf("MSIE") !== -1) {
            params.url = (params.jsonp_url || params.url) + '/create.js';
            params.data['_Version'] = "0.3.0";
            params.data['_RaiseHtmlError'] = false;
            params.data['auth_token'] = Conekta.getPublicKey();
            params.data['conekta_client_user_agent'] = '{"agent":"Conekta JavascriptBindings/0.3.0"}';
            return conektaAjax({
              url: base_url + params.url,
              dataType: 'jsonp',
              data: params.data,
              success: success_callback,
              error: error_callback
            });
          } else {
            if (typeof (new XMLHttpRequest()).withCredentials !== 'undefined') {
              return conektaAjax({
                url: base_url + params.url,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(params.data),
                contentType: 'application/json',
                headers: {
                  'RaiseHtmlError': false,
                  'Accept': 'application/vnd.conekta-v0.3.0+json',
                  'Accept-Language': Conekta.getLanguage(),
                  'Conekta-Client-User-Agent': '{"agent":"Conekta JavascriptBindings/0.3.0"}',
                  'Authorization': 'Basic ' + Base64.encode(Conekta.getPublicKey() + ':')
                },
                success: success_callback,
                error: error_callback
              });
            } else {
              rpc = new easyXDM.Rpc({
                swf: "https://conektaapi.s3.amazonaws.com/v0.3.2/flash/easyxdm.swf",
                remote: base_url + "easyxdm_cors_proxy.html"
              }, {
                remote: {
                  request: {}
                }
              });
              return rpc.request({
                url: base_url + params.url,
                method: 'POST',
                headers: {
                  'RaiseHtmlError': false,
                  'Accept': 'application/vnd.conekta-v0.3.0+json',
                  'Accept-Language': Conekta.getLanguage(),
                  'Conekta-Client-User-Agent': '{"agent":"Conekta JavascriptBindings/0.3.0"}',
                  'Authorization': 'Basic ' + Base64.encode(Conekta.getPublicKey() + ':')
                },
                data: JSON.stringify(params.data)
              }, success_callback, error_callback);
            }
          }
        },
        log: function(data) {
          if (typeof console !== 'undefined' && console.log) {
            return console.log(data);
          }
        },
        querySelectorAll: function(selectors) {
          var element, elements, style;
          if (!document.querySelectorAll) {
            style = document.createElement('style');
            elements = [];
            document.documentElement.firstChild.appendChild(style);
            document._qsa = [];
            if (style.styleSheet) {
              style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            } else {
              style.style.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
            }
            window.scrollBy(0, 0);
            style.parentNode.removeChild(style);
            while (document._qsa.length) {
              element = document._qsa.shift();
              element.style.removeAttribute('x-qsa');
              elements.push(element);
            }
            document._qsa = null;
            return elements;
          } else {
            return document.querySelectorAll(selectors);
          }
        },
        querySelector: function(selectors) {
          var elements;
          if (!document.querySelector) {
            elements = this.querySelectorAll(selectors);
            if (elements.length > 0) {
              return elements[0];
            } else {
              return null;
            }
          } else {
            return document.querySelector(selectors);
          }
        }
      }
    };
    if (Conekta._helpers.querySelectorAll('script[data-conekta-session-id]').length > 0) {
      $tag = Conekta._helpers.querySelectorAll('script[data-conekta-session-id]')[0];
      session_id = $tag.getAttribute('data-conekta-session-id');
    }
    if (Conekta._helpers.querySelectorAll('script[data-conekta-public-key]').length > 0) {
      $tag = Conekta._helpers.querySelectorAll('script[data-conekta-public-key]')[0];
      window.Conekta.setPublicKey($tag.getAttribute('data-conekta-public-key'));
    }
  }

}).call(this);

(function() {
  var accepted_cards, card_types, get_card_type, is_valid_length, is_valid_luhn, parseMonth, parseYear,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  card_types = [
    {
      name: 'amex',
      pattern: /^3[47]/,
      valid_length: [15]
    }, {
      name: 'diners_club_carte_blanche',
      pattern: /^30[0-5]/,
      valid_length: [14]
    }, {
      name: 'diners_club_international',
      pattern: /^36/,
      valid_length: [14]
    }, {
      name: 'jcb',
      pattern: /^35(2[89]|[3-8][0-9])/,
      valid_length: [16]
    }, {
      name: 'laser',
      pattern: /^(6304|670[69]|6771)/,
      valid_length: [16, 17, 18, 19]
    }, {
      name: 'visa_electron',
      pattern: /^(4026|417500|4508|4844|491(3|7))/,
      valid_length: [16]
    }, {
      name: 'visa',
      pattern: /^4/,
      valid_length: [16]
    }, {
      name: 'mastercard',
      pattern: /^5[1-5]/,
      valid_length: [16]
    }, {
      name: 'maestro',
      pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
    }, {
      name: 'discover',
      pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
      valid_length: [16]
    }
  ];

  is_valid_luhn = function(number) {
    var digit, i, len, n, ref, sum;
    sum = 0;
    ref = number.split('').reverse();
    for (n = i = 0, len = ref.length; i < len; n = ++i) {
      digit = ref[n];
      digit = +digit;
      if (n % 2) {
        digit *= 2;
        if (digit < 10) {
          sum += digit;
        } else {
          sum += digit - 9;
        }
      } else {
        sum += digit;
      }
    }
    return sum % 10 === 0;
  };

  is_valid_length = function(number, card_type) {
    var ref;
    return ref = number.length, indexOf.call(card_type.valid_length, ref) >= 0;
  };

  accepted_cards = ['visa', 'mastercard', 'maestro', 'visa_electron', 'amex', 'laser', 'diners_club_carte_blanche', 'diners_club_international', 'discover', 'jcb'];

  get_card_type = function(number) {
    var card, card_type, i, len, ref;
    ref = (function() {
      var j, len, ref, results;
      results = [];
      for (j = 0, len = card_types.length; j < len; j++) {
        card = card_types[j];
        if (ref = card.name, indexOf.call(accepted_cards, ref) >= 0) {
          results.push(card);
        }
      }
      return results;
    })();
    for (i = 0, len = ref.length; i < len; i++) {
      card_type = ref[i];
      if (number.match(card_type.pattern)) {
        return card_type;
      }
    }
    return null;
  };

  parseMonth = function(month) {
    if (typeof month === 'string' && month.match(/^[\d]{1,2}$/)) {
      return parseInt(month);
    } else {
      return month;
    }
  };

  parseYear = function(year) {
    if (typeof year === 'number' && year < 100) {
      year += 2000;
    }
    if (typeof year === 'string' && year.match(/^([\d]{2,2}|20[\d]{2,2})$/)) {
      if (year.match(/^([\d]{2,2})$/)) {
        year = '20' + year;
      }
      return parseInt(year);
    } else {
      return year;
    }
  };

  Conekta.card = {};

  Conekta.card.getBrand = function(number) {
    var brand;
    if (typeof number === 'string') {
      number = number.replace(/[ -]/g, '');
    } else if (typeof number === 'number') {
      number = toString(number);
    }
    brand = get_card_type(number);
    if (brand && brand.name) {
      return brand.name;
    }
    return null;
  };

  Conekta.card.validateCVC = function(cvc) {
    return (typeof cvc === 'number' && cvc >= 0 && cvc < 10000) || (typeof cvc === 'string' && cvc.match(/^[\d]{3,4}$/) !== null);
  };

  Conekta.card.validateExpMonth = function(exp_month) {
    var month;
    month = parseMonth(exp_month);
    return typeof month === 'number' && month > 0 && month < 13;
  };

  Conekta.card.validateExpYear = function(exp_year) {
    var year;
    year = parseYear(exp_year);
    return typeof year === 'number' && year > 2013 && year < 2035;
  };

  Conekta.card.validateExpirationDate = function(exp_month, exp_year) {
    var month, year;
    month = parseMonth(exp_month);
    year = parseYear(exp_year);
    if ((typeof month === 'number' && month > 0 && month < 13) && (typeof year === 'number' && year > 2013 && year < 2035)) {
      return (new Date(year, month, new Date(year, month, 0).getDate())) > (new Date());
    } else {
      return false;
    }
  };

  Conekta.card.validateExpiry = function(exp_month, exp_year) {
    return Conekta.card.validateExpirationDate(exp_month, exp_year);
  };

  Conekta.card.validateName = function(name) {
    return typeof name === 'string' && name.match(/^\s*[A-z]+\s+[A-z]+[\sA-z]*$/) !== null && name.match(/visa|master\s*card|amex|american\s*express|banorte|banamex|bancomer|hsbc|scotiabank|jcb|diners\s*club|discover/i) === null;
  };

  Conekta.card.validateNumber = function(number) {
    var card_type, length_valid, luhn_valid;
    if (typeof number === 'string') {
      number = number.replace(/[ -]/g, '');
    } else if (typeof number === 'number') {
      number = number.toString();
    } else {
      number = "";
    }
    card_type = get_card_type(number);
    luhn_valid = false;
    length_valid = false;
    if (card_type != null) {
      luhn_valid = is_valid_luhn(number);
      length_valid = is_valid_length(number, card_type);
    }
    return luhn_valid && length_valid;
  };

}).call(this);

(function() {
  Conekta.Token = {};

  Conekta.Token.create = function(token_form, success_callback, failure_callback) {
    var token;
    if (typeof success_callback !== 'function') {
      success_callback = Conekta._helpers.log;
    }
    if (typeof failure_callback !== 'function') {
      failure_callback = Conekta._helpers.log;
    }
    token = Conekta._helpers.parseForm(token_form);
    if (typeof token === 'object') {
      if (Conekta._helpers.objectKeys(token).length > 0) {
        if (token.card) {
          token.card.device_fingerprint = Conekta._helpers.getSessionId();
        } else {
          failure_callback({
            'object': 'error',
            'type': 'invalid_request_error',
            'message': "The form or hash has no attributes 'card'.  If you are using a form, please ensure that you have have an input or text area with the data-conekta attribute 'card[number]'.  For an example form see: https://github.com/conekta/conekta.js/blob/master/examples/credit_card.html",
            'message_to_purchaser': "The card could not be processed, please try again later"
          });
        }
        if (token.card && token.card.address && !(token.card.address.street1 || token.card.address.street2 || token.card.address.street3 || token.card.address.city || token.card.address.state || token.card.address.country || token.card.address.zip)) {
          delete token.card.address;
        }
        return Conekta._helpers.xDomainPost({
          jsonp_url: 'tokens',
          url: 'tokens',
          data: token,
          success: success_callback,
          error: failure_callback
        });
      } else {
        return failure_callback({
          'object': 'error',
          'type': 'invalid_request_error',
          'message': "supplied parameter 'token' is usable object but has no values (e.g. amount, description) associated with it",
          'message_to_purchaser': "The card could not be processed, please try again later"
        });
      }
    } else {
      return failure_callback({
        'object': 'error',
        'type': 'invalid_request_error',
        'message': "Supplied parameter 'token' is not a javascript object or a form",
        'message_to_purchaser': "The card could not be processed, please try again later"
      });
    }
  };

}).call(this);
