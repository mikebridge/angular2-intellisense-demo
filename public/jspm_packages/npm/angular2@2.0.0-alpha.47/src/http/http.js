/* */ 
'use strict';
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    return Reflect.decorate(decorators, target, key, desc);
  switch (arguments.length) {
    case 2:
      return decorators.reduceRight(function(o, d) {
        return (d && d(o)) || o;
      }, target);
    case 3:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key)), void 0;
      }, void 0);
    case 4:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key, o)) || o;
      }, desc);
  }
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var lang_1 = require('../facade/lang');
var exceptions_1 = require('../facade/exceptions');
var core_1 = require('../../core');
var interfaces_1 = require('./interfaces');
var static_request_1 = require('./static_request');
var base_request_options_1 = require('./base_request_options');
var enums_1 = require('./enums');
function httpRequest(backend, request) {
  return backend.createConnection(request).response;
}
function mergeOptions(defaultOpts, providedOpts, method, url) {
  var newOptions = defaultOpts;
  if (lang_1.isPresent(providedOpts)) {
    return newOptions.merge(new base_request_options_1.RequestOptions({
      method: providedOpts.method || method,
      url: providedOpts.url || url,
      search: providedOpts.search,
      headers: providedOpts.headers,
      body: providedOpts.body
    }));
  }
  if (lang_1.isPresent(method)) {
    return newOptions.merge(new base_request_options_1.RequestOptions({
      method: method,
      url: url
    }));
  } else {
    return newOptions.merge(new base_request_options_1.RequestOptions({url: url}));
  }
}
var Http = (function() {
  function Http(_backend, _defaultOptions) {
    this._backend = _backend;
    this._defaultOptions = _defaultOptions;
  }
  Http.prototype.request = function(url, options) {
    var responseObservable;
    if (lang_1.isString(url)) {
      responseObservable = httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Get, url)));
    } else if (url instanceof static_request_1.Request) {
      responseObservable = httpRequest(this._backend, url);
    } else {
      throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
    }
    return responseObservable;
  };
  Http.prototype.get = function(url, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Get, url)));
  };
  Http.prototype.post = function(url, body, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({body: body})), options, enums_1.RequestMethods.Post, url)));
  };
  Http.prototype.put = function(url, body, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({body: body})), options, enums_1.RequestMethods.Put, url)));
  };
  Http.prototype.delete = function(url, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Delete, url)));
  };
  Http.prototype.patch = function(url, body, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({body: body})), options, enums_1.RequestMethods.Patch, url)));
  };
  Http.prototype.head = function(url, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Head, url)));
  };
  Http = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [interfaces_1.ConnectionBackend, base_request_options_1.RequestOptions])], Http);
  return Http;
})();
exports.Http = Http;
var Jsonp = (function(_super) {
  __extends(Jsonp, _super);
  function Jsonp(backend, defaultOptions) {
    _super.call(this, backend, defaultOptions);
  }
  Jsonp.prototype.request = function(url, options) {
    var responseObservable;
    if (lang_1.isString(url)) {
      url = new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethods.Get, url));
    }
    if (url instanceof static_request_1.Request) {
      if (url.method !== enums_1.RequestMethods.Get) {
        exceptions_1.makeTypeError('JSONP requests must use GET request method.');
      }
      responseObservable = httpRequest(this._backend, url);
    } else {
      throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
    }
    return responseObservable;
  };
  Jsonp = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [interfaces_1.ConnectionBackend, base_request_options_1.RequestOptions])], Jsonp);
  return Jsonp;
})(Http);
exports.Jsonp = Jsonp;
